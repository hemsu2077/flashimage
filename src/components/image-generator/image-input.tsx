'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Plus } from 'lucide-react';
import { ImageFile } from './types';

interface ImageInputProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
}

const sampleImages = [
  'https://pub-0e2ed356515c4b04b2ef9ad8006e4830.r2.dev/landing/flash_image_sample-1.webp',
  'https://pub-0e2ed356515c4b04b2ef9ad8006e4830.r2.dev/landing/flash_image_sample-2.webp',
  'https://pub-0e2ed356515c4b04b2ef9ad8006e4830.r2.dev/landing/flash_image_sample-3.webp',
  'https://pub-0e2ed356515c4b04b2ef9ad8006e4830.r2.dev/landing/flash_image_sample-4.webp',
  'https://pub-0e2ed356515c4b04b2ef9ad8006e4830.r2.dev/landing/flash_image_sample-5.webp',
];

export function ImageInput({ images, onImagesChange }: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = [];
    const remainingSlots = 5 - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const id = Date.now().toString() + i;
        const preview = URL.createObjectURL(file);
        newImages.push({ id, file, preview });
      }
    }

    onImagesChange([...images, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const addSampleImage = async (url: string) => {
    if (images.length >= 5) return;

    try {
      // Create a simple file object using the URL directly
      const id = Date.now().toString();
      const filename = `sample-${id}.webp`;
      
      // For sample images, we'll use the URL directly as both file and preview
      // Create a mock file object for consistency
      const mockFile = new File([''], filename, { type: 'image/webp' });
      
      onImagesChange([...images, { 
        id, 
        file: mockFile, 
        preview: url // Use the original URL as preview
      }]);
    } catch (error) {
      console.error('Failed to load sample image:', error);
    }
  };

  const canAddMore = images.length < 5;

  const handleMouseEnter = (url: string, event: React.MouseEvent) => {
    setHoveredImage(url);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">
          Upload Images ({images.length}/5)
        </div>
        <p className="text-xs text-muted-foreground">
          Drag and drop images here, or click to select (JPG, PNG, WEBP), Max 5MB each
        </p>
      </div>
      
      {/* Upload Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {/* Uploaded Images */}
        {images.map((image) => (
          <div key={image.id} className="relative">
            <div className="overflow-hidden aspect-square rounded-lg border">
              <img
                src={image.preview}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1 h-6 w-6 rounded-full p-0 bg-primary/70 hover:bg-primary/80 text-white hover:text-white"
              onClick={() => removeImage(image.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {/* Upload Slot */}
        {canAddMore && (
          <div
            className={`border-2 border-dashed rounded-lg aspect-square flex items-center justify-center cursor-pointer transition-colors ${
              dragOver ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50 hover:bg-accent/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* Sample Images */}
      <div className="space-y-2">
        <div className="text-sm font-medium">Sample Images</div>
        <div className="flex flex-wrap gap-2">
          {sampleImages.map((url, index) => (
            <div
              key={index}
              className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all rounded border w-12 h-12 flex-shrink-0"
              onClick={() => addSampleImage(url)}
              onMouseEnter={(e) => handleMouseEnter(url, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={url}
                alt={`Sample ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hover Preview */}
      {hoveredImage && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x - 96, 
            top: mousePosition.y + 35,  
          }}
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">
            <img
              src={hoveredImage}
              alt="Preview"
              className="w-48 h-48 object-cover rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
