'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TabSwitcher } from './tab-switcher';
import { ImageInput } from './image-input';
import { PromptInput } from './prompt-input';
import { GenerateButton } from './generate-button';
import { ResultPanel } from './result-panel';
import { GenerationMode, ImageFile, GenerationState } from './types';

export function ImageGenerator() {
  const [mode, setMode] = useState<GenerationMode>('image-to-image');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [prompt, setPrompt] = useState('');
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    result: null,
    error: null,
  });

  const handleGenerate = async () => {
    if (mode === 'image-to-image' && images.length === 0) {
      return;
    }
    
    if (!prompt.trim()) {
      return;
    }

    setGenerationState(prev => ({
      ...prev,
      isGenerating: true,
      error: null,
    }));

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
          }
        }
      }
    }

    console.log('Generating with:', { mode, images: processedImages, prompt });
    
    // TODO: Replace with actual API call
    // const response = await fetch('/api/gen-image', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ prompt, images: processedImages })
    // });
    
    // Simulate generation
    setTimeout(() => {
      setGenerationState({
        isGenerating: false,
        result: {
          id: Date.now().toString(),
          url: 'https://via.placeholder.com/512x512?text=Generated+Image',
          filename: 'generated.png',
          provider: 'replicate',
        },
        error: null,
      });
    }, 3000);
  };

  const canGenerate = prompt.trim() && (mode === 'text-to-image' || images.length > 0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-0">
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
  );
}
