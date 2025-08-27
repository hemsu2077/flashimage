export interface GeneratedImage {
  uuid: string;
  generated_image_url: string;
  original_image_url: string | null;
  style: string;
  ratio: string | null;
  mode: string;
  prompt: string | null;
  created_at: Date | null;
  filename: string | null;
}
