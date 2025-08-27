import { respData, respErr } from "@/lib/resp";
import { experimental_generateImage as generateImage } from "ai";
import { replicate } from "@ai-sdk/replicate";
import { newStorage } from "@/lib/storage";
import { auth } from "@/auth";
import { getUserCredits, decreaseCredits, CreditsTransType } from "@/services/credit";
import { isAuthEnabled } from "@/lib/auth";
import { insertImage } from "@/models/image";
import { getUuid } from "@/lib/hash";

export async function POST(req: Request) {
try {
    let userUuid = "";
    
      // Check authentication and credits only if auth is enabled
      if (isAuthEnabled()) {
        const session = await auth();
        if (!session?.user?.uuid) {
          return Response.json(
            { code: -1, message: "Authentication required" }, 
            { status: 401 }
          );
        }

        userUuid = session.user.uuid;

        // Check user credits
        const userCredits = await getUserCredits(userUuid);
        if (userCredits.left_credits < 2) {
          return Response.json(
            { code: -1, message: "Insufficient credits." }, 
            { status: 402 }
          );
        }
      }

    const { prompt, images, mode } = await req.json();

    // Validate required inputs
    if (!prompt) {
      return respErr("Missing required parameter: prompt");
    }
    
    // For image-to-image mode, images are required
    if (mode === 'image-to-image' && (!images || !Array.isArray(images) || images.length === 0)) {
      return respErr("Missing required parameter: images (array) for image-to-image mode");
    }
    
    // Ensure images is an array (empty for text-to-image)
    const imageArray = images || [];
    
    // Choose model
    const model = "google/nano-banana";
    console.log(`Using model: ${model}`);
    
    // Process input images - handle both URLs and base64
    const imageUrls: string[] = [];
    const storage = newStorage();
    
    for (let i = 0; i < imageArray.length; i++) {
      const image = imageArray[i];
      
      if (image.startsWith('https://')) {
        imageUrls.push(image);
        console.log(`Using sample image URL ${i + 1}:`, image);
      } else {
        // Upload the input image to get a URL
        const inputFilename = `input_${new Date().getTime()}_${i}.png`;
        const inputKey = `flashimage/inputs/${inputFilename}`;
        const inputBody = Buffer.from(image, "base64");

        try {
          const inputUploadResult = await storage.uploadFile({
            body: inputBody,
            key: inputKey,
            contentType: "image/png",
            disposition: "inline",
          });
          imageUrls.push(inputUploadResult.url);
          console.log(`Input image ${i + 1} uploaded to:`, inputUploadResult.url);
        } catch (uploadError) {
          console.error(`Failed to upload input image ${i + 1}:`, uploadError);
          throw new Error(`Failed to upload input image ${i + 1}`);
        }
      }
    }
    const imageModel = replicate.image(model);
    const providerOptions: any = {
      replicate: {
        output_format: "png",
      },
    };
    
    // Only add image_input for image-to-image mode
    if (mode === 'image-to-image' && imageUrls.length > 0) {
      providerOptions.replicate.image_input = imageUrls;
    }

    const { images: generatedImages, warnings } = await generateImage({
        model: imageModel,
        prompt: prompt,
        n: 1,
        providerOptions,
      });

      if (warnings.length > 0) {
        console.warn("Generation warnings:", warnings);
        // Don't throw error for warnings, just log them
      }

      if (!generatedImages || generatedImages.length === 0) {
        throw new Error("No images generated");
      }
       
    const provider = "replicate";

    const processedImages = await Promise.all(
      generatedImages.map(async (image) => {
        const filename = `flashimage_${new Date().getTime()}.png`;
        const key = `flashimage/${filename}`;
        const body = Buffer.from(image.base64, "base64");

        try {
          const res = await storage.uploadFile({
            body,
            key,
            contentType: "image/png",
            disposition: "inline",
          });

          // Store image data to database if auth is enabled and we have user UUID
          if (isAuthEnabled() && userUuid) {
            try {
              const imageUuid = getUuid();
              const currentTime = new Date();
              
              await insertImage({
                uuid: imageUuid,
                user_uuid: userUuid,
                original_image_url: imageUrls[0] || "", // Use first image URL as primary
                generated_image_url: res.url || "",
                style: "custom", // Since we don't have predefined styles anymore
                ratio: "custom", // Since ratio is not used in new model
                mode: mode || "text-to-image", // Save the generation mode
                prompt: prompt, // Save the generation prompt
                provider: provider,
                filename: filename,
                status: "completed",
                created_at: currentTime,
                updated_at: currentTime,
              });
              console.log(`Image data stored to database for user ${userUuid}`);
            } catch (dbError) {
              console.error("Failed to store image data to database:", dbError);
              // Don't fail the request if database storage fails
            }
          }

          return {
            ...res,
            provider,
            filename,
          };
        } catch (err) {
          console.log("upload file failed:", err);
          return {
            provider,
            filename,
          };
        }
      })
    );

    // Deduct credits after successful generation (only if auth is enabled)
    if (isAuthEnabled() && userUuid) {
      try {
        await decreaseCredits({
          user_uuid: userUuid,
          trans_type: CreditsTransType.DrawingGeneration,
          credits: 2,
        });
        console.log(`Successfully deducted 2 credits from user ${userUuid}`);
      } catch (creditError) {
        console.error("Failed to deduct credits:", creditError);
        // Note: We don't fail the request if credit deduction fails
        // as the image has already been generated successfully
      }
    }
  
    return respData(processedImages)   
} catch (e) {
    console.error("Generation error:", e);
    const errorMessage = e instanceof Error ? e.message : "Transform failed";
    return respErr(errorMessage); 
}
}