
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { db } from '@/lib/database';
import { supabase } from '@/lib/supabase';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthContext } from '@/App';
import { Image, Upload, XCircle } from 'lucide-react';

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
  images: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const SubmitProperty = () => {
  const { user, session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [bucketExists, setBucketExists] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to submit property information", {
        description: "You need to be logged in to submit property data",
        duration: 4000,
      });
      navigate("/signin", { state: { returnTo: "/submit-property" } });
    }
  }, [user, navigate]);

  useEffect(() => {
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

    checkBucket();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      location: '',
      bedrooms: undefined,
      bathrooms: undefined,
      area: undefined,
      type: 'house',
      status: 'sale',
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
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
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

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error("You must be logged in to submit a property");
      navigate("/signin");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting property submission...");
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw new Error(`Authentication error: ${sessionError.message}`);
      }
      
      const session = sessionData?.session;
      
      if (!session) {
        throw new Error('You must be logged in to submit a property');
      }
      
      const userId = session.user.id;
      
      // Check if user exists and create if not
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (userError || !userData) {
        console.log("User not found, creating user profile...");
        const { data: userInfo } = await supabase.auth.getUser();
        
        if (!userInfo.user) {
          throw new Error('Could not retrieve user information');
        }
        
        const { error: createUserError } = await supabase
          .from('users')
          .insert({
            id: userId,
            name: userInfo.user.user_metadata?.full_name || 'New User',
            email: userInfo.user.email || '',
            phone: userInfo.user.user_metadata?.phone || 'No phone',
            location: 'Unknown location',
            user_type: 'seller',
            tokens: 0
          });
        
        if (createUserError) {
          throw new Error(`Failed to create user profile: ${createUserError.message}`);
        }
        
        console.log("User profile created successfully");
      }
      
      console.log("Uploading images...");
      let imageUrls: string[] = [];
      
      if (bucketExists && imageFiles.length > 0) {
        toast.info("Uploading images...", {
          description: "Please wait while we upload your property images"
        });
        
        imageUrls = await uploadImages(userId);
        
        if (imageUrls.length > 0) {
          toast.success(`${imageUrls.length} images uploaded successfully`);
        } else if (imageFiles.length > 0) {
          toast.error("Failed to upload images", {
            description: "Your property will be submitted without images"
          });
        }
      }
      
      console.log("Submitting property data with images:", imageUrls);
      const propertySubmission = await db.submitPropertyInfo(userId, {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        area: data.area || null,
        type: data.type,
        status: data.status,
        images: imageUrls
      });
      
      if (!propertySubmission) {
        throw new Error('Failed to submit property');
      }
      
      console.log("Property submitted successfully:", propertySubmission);
      setSubmissionResult(propertySubmission);
      
      toast.success('Property submitted successfully', {
        description: 'Your submission will be reviewed by an admin. You will be awarded tokens when your property is approved.',
        duration: 5000,
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit property');
      toast.error('Submission failed', {
        description: err.message || 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container max-w-4xl py-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Alert>
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                Redirecting to sign in page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Submit Property Information</h1>
      <p className="text-muted-foreground">Submit details about properties in your area to earn rewards. The more accurate and complete the information, the more tokens you'll earn!</p>
      
      {!bucketExists && (
        <Alert variant="destructive">
          <AlertTitle>Storage Not Available</AlertTitle>
          <AlertDescription>
            Image upload is not available at the moment. You can still submit property details without images.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Submission Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {submissionResult ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Submission Successful!</CardTitle>
            <CardDescription>Your property information has been submitted for review.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You've earned <span className="font-bold">{submissionResult.tokensAwarded}</span> tokens for this submission!</p>
            <p className="text-muted-foreground mt-2">Redirecting to home page...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Fill out the form with accurate property information</CardDescription>
          </CardHeader>
          <CardContent>
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
                
                {bucketExists && (
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
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || uploading}
                >
                  {loading || uploading ? 'Processing...' : 'Submit Property Information'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              By submitting this information, you confirm that all details are accurate to the best of your knowledge.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SubmitProperty;
