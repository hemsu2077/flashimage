"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GeneratedImage } from './shared-types';

interface DeleteConfirmationDialogProps {
  image: GeneratedImage | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (image: GeneratedImage) => void;
  isDeleting?: boolean;
}

export function DeleteConfirmationDialog({ 
  image, 
  isOpen, 
  onClose, 
  onConfirm,
  isDeleting = false
}: DeleteConfirmationDialogProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this image? This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => onConfirm(image)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
