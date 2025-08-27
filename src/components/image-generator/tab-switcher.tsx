'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenerationMode } from './types';

interface TabSwitcherProps {
  mode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
}

export function TabSwitcher({ mode, onModeChange }: TabSwitcherProps) {
  return (
    <div className="w-full">
      <Tabs value={mode} onValueChange={(value) => onModeChange(value as GenerationMode)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="image-to-image" className="text-sm">
            Image to Image
          </TabsTrigger>
          <TabsTrigger value="text-to-image" className="text-sm">
            Text to Image
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
