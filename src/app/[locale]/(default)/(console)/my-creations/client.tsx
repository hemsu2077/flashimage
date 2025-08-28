"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { GeneratedImage } from "@/components/image-generator/shared-types";
import { ImageCard } from "@/components/image-generator/image-card";
import { ImageDetailModal } from "@/components/image-generator/image-detail-modal";
import { DeleteConfirmationDialog } from "@/components/image-generator/delete-confirmation-dialog";

interface MyImagesClientProps {
  images: GeneratedImage[];
}

const ITEMS_PER_PAGE = 12;

export default function MyImagesClient({ images }: MyImagesClientProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [imagesList, setImagesList] = useState(images);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GeneratedImage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(imagesList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = imagesList.slice(startIndex, endIndex);

  const handleDelete = async (image: GeneratedImage) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/delete-image/${image.uuid}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setImagesList(prev => prev.filter(d => d.uuid !== image.uuid));
      toast.success("Image deleted successfully");
      setIsDeleteDialogOpen(false);
      setImageToDelete(null);
      
      // if current page has only one image, go to previous page
      if (currentImages.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (imagesList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">No Creations Yet</h1>
            <p className="text-gray-600 mb-8">
              You haven't created any creations yet. Start by converting your first image!
            </p>
          </div>
          <Link href="/#gen-image">
            <Button size="lg" className="px-8">
              Generate Image
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Creations</h1>
        <p className="text-gray-600">
           {imagesList.length} total creations
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {currentImages.map((image) => (
          <ImageCard
            key={image.uuid}
            image={image}
            onClick={() => setSelectedImage(image)}
            showDeleteButton={true}
            showDownloadButton={true}
            showToast={true}
            onDelete={() => {
              setImageToDelete(image);
              setIsDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Image Detail Modal */}
      <ImageDetailModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        showToast={true}
        showDeleteButton={true}
        onDelete={(image) => {
          setSelectedImage(null);
          setImageToDelete(image);
          setIsDeleteDialogOpen(true);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        image={imageToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
