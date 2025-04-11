
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Image, Loader2, Upload, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateProperty } from '@/lib/database/queries';
import { supabase } from '@/lib/supabase';
import { Property } from '@/lib/database/types';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  location: z.string().min(3, { message: 'Location is required' }),
  bedrooms: z.coerce.number().int().positive().optional(),
  bathrooms: z.coerce.number().positive().optional(),
  area: z.coerce.number().positive().optional(),
  type: z.enum(['house', 'apartment', 'commercial', 'land']),
  status: z.enum(['sale', 'rent']),
});

type FormData = z.infer<typeof formSchema>;

interface EditPropertyFormProps {
  property: Property;
  userId: string;
  onSuccess?: () => void;
}

export const EditPropertyForm = ({ property, userId, onSuccess }: EditPropertyFormProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(property.images || []);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms || undefined,
      bathrooms: property.bathrooms || undefined,
      area: property.area || undefined,
      type: property.type || 'house',
      status: property.status || 'sale',
    },
  });

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
    // For existing images from the server, just remove from our local state
    if (index < (property.images?.length || 0)) {
      setImageUrls(prev => prev.filter((_, i) => i !== index));
      // We'll update the property.images array when saving
    } 
    // For newly added files
    else {
      const adjustedIndex = index - (property.images?.length || 0);
      setImageFiles(prev => prev.filter((_, i) => i !== adjustedIndex));
      
      // Also remove the URL
      URL.revokeObjectURL(imageUrls[index]);
      setImageUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const uploadImages = async (userId: string) => {
    if (imageFiles.length === 0) {
      return [...(imageUrls.slice(0, property.images?.length || 0))];
    }
    
    setUploading(true);
    const allImageUrls: string[] = [...(imageUrls.slice(0, property.images?.length || 0))];
    
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
          allImageUrls.push(urlData.publicUrl);
        } else {
          console.error('Failed to get public URL for uploaded file');
        }
      }
    } catch (err) {
      console.error('Unexpected error during image upload:', err);
    } finally {
      setUploading(false);
    }
    
    console.log('All image URLs:', allImageUrls);
    return allImageUrls;
  };

  const onSubmit = async (data: FormData) => {
    if (!userId) {
      toast.error("You must be logged in to update a property");
      navigate("/signin");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting property update...");
      
      const propertyImages = await uploadImages(userId);
      
      console.log("Updating property data with images:", propertyImages);
      const updatedProperty = await updateProperty(property.id, {
        ...data,
        images: propertyImages,
      });
      
      if (!updatedProperty) {
        throw new Error('Failed to update property');
      }
      
      console.log("Property updated successfully:", updatedProperty);
      
      toast.success('Property updated successfully', {
        description: 'Your property information has been updated.',
        duration: 5000,
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          navigate(`/property/${property.id}`);
        }, 1500);
      }
      
    } catch (err: any) {
      console.error('Update error:', err);
      setError(err.message || 'Failed to update property');
      toast.error('Update failed', {
        description: err.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Property</CardTitle>
        <CardDescription>Update your property information</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start text-red-800">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Modern Apartment in Downtown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="250000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Lagos, Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.5" placeholder="2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (sq ft/m)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="1200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a detailed description of the property..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel className="block mb-2">Property Images</FormLabel>
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
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
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || uploading}
            >
              {loading || uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploading ? 'Uploading Images...' : 'Updating Property...'}
                </>
              ) : 'Update Property'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
