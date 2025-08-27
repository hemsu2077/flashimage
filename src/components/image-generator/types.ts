export type GenerationMode = 'image-to-image' | 'text-to-image';

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export interface GenerationRequest {
  mode: GenerationMode;
  prompt: string;
  images: string[]; // base64 or URLs
}

export interface GenerationResult {
  id: string;
  url: string;
  filename: string;
  provider: string;
}

export interface GenerationState {
  isGenerating: boolean;
  result: GenerationResult | null;
  error: string | null;
  showAddCredits?: boolean;
}
