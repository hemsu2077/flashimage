'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  mode: 'text2img' | 'img2img';
}

interface PresetPrompt {
  title: string;
  prompt: string;
}

const textToImagePrompts: PresetPrompt[] = [
  {
    title: "Portrait",
    prompt: "A professional portrait photo of a person, high quality, detailed, studio lighting"
  },
  {
    title: "Landscape",
    prompt: "A beautiful landscape scene, natural lighting, high resolution, detailed"
  },
  {
    title: "Anime Style",
    prompt: "Anime style illustration, vibrant colors, detailed, high quality"
  },
  {
    title: "Realistic Art",
    prompt: "Photorealistic art, highly detailed, professional quality, 4K resolution"
  },
  {
    title: "Fantasy",
    prompt: "Fantasy art style, magical elements, detailed, vibrant colors"
  },
  {
    title: "Minimalist",
    prompt: "Minimalist design, clean lines, simple composition, modern style"
  },
  {
    title: "Vintage",
    prompt: "Vintage style, retro aesthetic, warm tones, classic composition"
  },
  {
    title: "Abstract",
    prompt: "Abstract art, creative composition, vibrant colors, artistic style"
  }
];

const imageToImagePrompts: PresetPrompt[] = [
  {
    title: "Remove Background",
    prompt: "Remove the background, keep the main subject, clean cutout"
  },
  {
    title: "Change Clothing",
    prompt: "Change the clothing to casual wear, maintain the person's pose and appearance"
  },
  {
    title: "Hair Style",
    prompt: "Change the hairstyle to a modern short cut, keep facial features"
  },
  {
    title: "Add Colors",
    prompt: "Make the image more colorful and vibrant, enhance saturation"
  },
  {
    title: "Artistic Effect",
    prompt: "Apply artistic effects, painting-like style, enhanced details"
  },
  {
    title: "Better Lighting",
    prompt: "Enhance the lighting, improve brightness and contrast, professional look"
  },
  {
    title: "Black & White",
    prompt: "Convert to black and white, high contrast, dramatic effect"
  },
  {
    title: "Vintage Filter",
    prompt: "Add vintage filter effect, warm tones, retro aesthetic"
  }
];

export function PromptInput({ value, onChange, mode }: PromptInputProps) {
  const presetPrompts = mode === 'text2img' ? textToImagePrompts : imageToImagePrompts;
  
  const handlePresetClick = (presetPrompt: PresetPrompt) => {
    if (value.trim()) {
      onChange(value + ', ' + presetPrompt.prompt);
    } else {
      onChange(presetPrompt.prompt);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Prompt
        </label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={mode === 'text2img' ? "Describe what you want to generate..." : "Describe how you want to modify the image..."}
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Quick Prompts</div>
        <div className="flex flex-wrap gap-2">
          {presetPrompts.map((preset, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => handlePresetClick(preset)}
              title={preset.prompt}
            >
              {preset.title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
