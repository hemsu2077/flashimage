'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Coins } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
}

export function GenerateButton({ onClick, disabled, isGenerating }: GenerateButtonProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-12 text-base font-medium"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            Generate Image
            <Coins className="w-5 h-5 mr-2" /> 2
          </>
        )}
      </Button>
      
    </div>
  );
}
