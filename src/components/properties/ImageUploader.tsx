
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';
import { FormDescription } from '@/components/ui/form';
import { XCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  bucketExists: boolean;
}

export const ImageUploader = ({ 
  imageUrls, 
  setImageUrls, 
  imageFiles, 
  setImageFiles, 
  bucketExists 
}: ImageUploaderProps) => {
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file types and size
      const validFiles = newFiles.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        
        if (!isValidType) {
          toast.error(`Invalid file type: ${file.name}`, {
            description: "Only JPG, PNG, GIF, and WebP images are allowed"
          });
        }
        
        if (!isValidSize) {
          toast.error(`File too large: ${file.name}`, {
            description: "Maximum file size is 5MB"
          });
        }
        
        return isValidType && isValidSize;
      });
      
      if (validFiles.length > 0) {
        setImageFiles(prev => [...prev, ...validFiles]);
        
        const newUrls = validFiles.map(file => URL.createObjectURL(file));
        setImageUrls(prev => [...prev, ...newUrls]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  if (!bucketExists) {
    return null;
  }

  return (
    <div>
      <FormLabel className="block mb-2">Property Images</FormLabel>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
        <Input
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          multiple
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WebP up to 5MB</p>
        </div>
      </div>
      
      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="h-24 overflow-hidden rounded-md border border-gray-200">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-90 hover:opacity-100"
                aria-label="Remove image"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <FormDescription className="mt-2">
        Adding high-quality images will increase your token rewards.
      </FormDescription>
    </div>
  );
};
