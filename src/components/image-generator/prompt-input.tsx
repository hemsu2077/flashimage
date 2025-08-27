'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

const presetPrompts = [
  "remove the background",
  "change the cloth to casual wear",
  "change hair cut to short style",
  "make it more colorful",
  "add artistic effects",
  "enhance the lighting",
  "make it black and white",
  "add vintage filter"
];

export function PromptInput({ value, onChange }: PromptInputProps) {
  const handlePresetClick = (preset: string) => {
    if (value.trim()) {
      onChange(value + ', ' + preset);
    } else {
      onChange(preset);
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
          placeholder="Describe what you want to generate or modify..."
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
            >
              {preset}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
