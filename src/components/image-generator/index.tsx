'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TabSwitcher } from './tab-switcher';
import { ImageInput } from './image-input';
import { PromptInput } from './prompt-input';
import { GenerateButton } from './generate-button';
import { ResultPanel } from './result-panel';
import { GenerationMode, ImageFile, GenerationState } from './types';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/contexts/app';
import { isAuthEnabled } from '@/lib/auth';

export function ImageGenerator() {
  const { data: session } = isAuthEnabled() ? useSession() : { data: null };
  const { setShowSignModal } = useAppContext();
  
  const [mode, setMode] = useState<GenerationMode>('image-to-image');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [prompt, setPrompt] = useState('');
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    result: null,
    error: null,
  });

  const handleGenerate = async () => {
    // Check if user is logged in (only if auth is enabled)
    if (isAuthEnabled() && !session) {
      setShowSignModal(true);
      return;
    }

    if (mode === 'image-to-image' && images.length === 0) {
      setGenerationState(prev => ({
        ...prev,
        error: 'Please select at least one image for image-to-image generation',
      }));
      return;
    }
    
    if (!prompt.trim()) {
      setGenerationState(prev => ({
        ...prev,
        error: 'Please enter a prompt',
      }));
      return;
    }

    setGenerationState(prev => ({
      ...prev,
      isGenerating: true,
      error: null,
    }));

    try {
      // Process images for API call
      const processedImages: string[] = [];
      
      if (mode === 'image-to-image') {
        for (const image of images) {
          if (image.preview.startsWith('https://')) {
            // Sample image - use URL directly
            processedImages.push(image.preview);
          } else {
            // User uploaded image - convert to base64
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = image.preview;
              });
              
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0);
              
              const base64 = canvas.toDataURL('image/png').split(',')[1];
              processedImages.push(base64);
            } catch (error) {
              console.error('Failed to process image:', error);
              setGenerationState({
                isGenerating: false,
                result: null,
                error: 'Failed to process uploaded image',
              });
              return;
            }
          }
        }
      }

      console.log('Generating with:', { mode, images: processedImages, prompt });
      
      // Call the actual API
      const response = await fetch('/api/gen-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          images: processedImages,
          mode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Authentication required - show login modal
          setShowSignModal(true);
          setGenerationState({
            isGenerating: false,
            result: null,
            error: null,
          });
          return;
        } else if (response.status === 402) {
          // Insufficient credits
          setGenerationState({
            isGenerating: false,
            result: null,
            error: data.message || 'Insufficient credits',
            showAddCredits: true,
          });
          return;
        }
        throw new Error('Generated Failed, Try again');
      }

      // API returns {code: 0, message: "ok", data: [...]}
      if (data.code === 0 && data.data && data.data.length > 0) {
        const firstResult = data.data[0];
        setGenerationState({
          isGenerating: false,
          result: {
            id: Date.now().toString(),
            url: firstResult.url || firstResult.signedUrl || '',
            filename: firstResult.filename || 'generated.png',
            provider: firstResult.provider || 'replicate',
          },
          error: null,
        });
      } else {
        throw new Error('Generated Failed, Try again');
      }
    } catch (error) {
      console.error('Generation error:', error);
      setGenerationState({
        isGenerating: false,
        result: null,
        error: 'Generated Failed, Try again',
      });
    }
  };

  const canGenerate = prompt.trim() && (mode === 'text-to-image' || images.length > 0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-[6px] rounded-lg shadow-none">
        <Card className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-0 border-none shadow-none bg-white rounded-lg">
        {/* Left Panel - Input */}
        <div className="space-y-6">
          <Card className="border-none shadow-none py-2">
            <CardContent className="p-6 space-y-6">
              <TabSwitcher mode={mode} onModeChange={setMode} />
              
              {mode === 'image-to-image' && (
                <ImageInput images={images} onImagesChange={setImages} />
              )}
              
              <PromptInput 
                value={prompt} 
                onChange={setPrompt} 
                mode={mode === 'text-to-image' ? 'text2img' : 'img2img'} 
              />
              
              <GenerateButton
                onClick={handleGenerate}
                disabled={!canGenerate || generationState.isGenerating}
                isGenerating={generationState.isGenerating}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Result */}
        <div>
          <ResultPanel generationState={generationState} />
        </div>
        </Card>
      </div>
    </div>
  );
}
