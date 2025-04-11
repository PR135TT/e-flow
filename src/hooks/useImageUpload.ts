
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [bucketExists, setBucketExists] = useState(true);

  const checkBucket = async () => {
    try {
      const { data, error } = await supabase.storage.getBucket('properties-images');
      if (error) {
        console.error('Bucket check error:', error);
        console.log('Attempting to verify if bucket exists differently...');
        
        // Try to list files in the bucket as another way to check
        const { data: listData, error: listError } = await supabase.storage
          .from('properties-images')
          .list('');
          
        if (listError) {
          console.error('Secondary bucket check error:', listError);
          setBucketExists(false);
        } else {
          console.log('Bucket exists - confirmed by list operation');
          setBucketExists(true);
        }
      } else {
        console.log('Bucket exists:', data);
        setBucketExists(true);
      }
    } catch (err) {
      console.error('Failed to check bucket:', err);
      setBucketExists(false);
    }
  };

  const uploadImages = async (userId: string) => {
    if (!bucketExists || imageFiles.length === 0) {
      console.log('No bucket exists or no images to upload');
      return [];
    }
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of imageFiles) {
        const filePath = `${userId}/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        
        console.log(`Uploading file: ${filePath}`);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('properties-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Image upload error:', uploadError);
          toast.error(`Failed to upload ${file.name}`, {
            description: uploadError.message
          });
          continue;
        }
        
        console.log('Upload successful:', uploadData);
        
        const { data: urlData } = await supabase.storage
          .from('properties-images')
          .getPublicUrl(filePath);
          
        if (urlData && urlData.publicUrl) {
          console.log('Public URL generated:', urlData.publicUrl);
          uploadedUrls.push(urlData.publicUrl);
        } else {
          console.error('Failed to get public URL for uploaded file');
        }
      }
    } catch (err) {
      console.error('Unexpected error during image upload:', err);
    } finally {
      setUploading(false);
    }
    
    console.log('All uploaded URLs:', uploadedUrls);
    return uploadedUrls;
  };

  return {
    uploading,
    imageFiles,
    setImageFiles,
    imageUrls,
    setImageUrls,
    bucketExists,
    checkBucket,
    uploadImages,
  };
};
