"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download, Trash2 } from 'lucide-react';
import { GeneratedImage } from './shared-types';
import { formatStyle, formatDate, formatMode, handleDownload } from './shared-utils';

interface ImageDetailModalProps {
  image: GeneratedImage | null;
  isOpen: boolean;
  onClose: () => void;
  showToast?: boolean;
  showDeleteButton?: boolean;
  onDelete?: (image: GeneratedImage) => void;
}

export function ImageDetailModal({ 
  image, 
  isOpen, 
  onClose,
  showToast = false,
  showDeleteButton = false,
  onDelete
}: ImageDetailModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative aspect-square bg-gray-100 rounded-lg md:col-span-2">
            <Image
              src={image.generated_image_url}
              alt={"Flash Image Generated"}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>Image Details</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Mode</label>
                <p className="text-gray-900">{formatMode(image.mode)}</p>
              </div>
              
              {image.prompt && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Prompt</label>
                  <p className="text-gray-900 text-sm leading-relaxed">{image.prompt}</p>
                </div>
              )}
              
              <div>
                <label className="text-xs font-medium text-gray-500">Created</label>
                <p className="text-gray-900">{formatDate(image.created_at)}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => handleDownload(image, showToast)}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              
              {showDeleteButton && onDelete && (
                <Button 
                  variant="destructive"
                  onClick={() => {
                    onDelete(image);
                    onClose();
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
