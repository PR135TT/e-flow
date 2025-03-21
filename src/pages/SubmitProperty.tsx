
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Upload, Image, Check, ChevronDown, DollarSign, X, AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { db } from "@/lib/database";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, "Price must be a positive number"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  bedrooms: z.string().refine(val => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), "Bedrooms must be a non-negative number"),
  bathrooms: z.string().refine(val => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), "Bathrooms must be a non-negative number"),
  area: z.string().refine(val => val === "" || (!isNaN(Number(val)) && Number(val) > 0), "Area must be a positive number"),
  type: z.enum(["house", "apartment", "commercial", "land"]),
  status: z.enum(["sale", "rent"])
});

const SubmitProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useState(() => {
    if (!user) {
      toast.error("Please sign in to submit a property");
      navigate("/signin", { state: { returnUrl: "/submit-property" } });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      type: "house",
      status: "sale"
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      const invalidFiles = newFiles.filter(file => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        toast.error("Only image files are allowed");
        return;
      }
      
      const largeFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (largeFiles.length > 0) {
        toast.error("Images must be smaller than 5MB");
        return;
      }
      
      setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
      setUploadError(null);
      
      const objectURLs = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prevUrls => [...prevUrls, ...objectURLs]);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(prevUrls => {
      const newUrls = [...prevUrls];
      
      if (index < imageFiles.length) {
        URL.revokeObjectURL(newUrls[index]);
      }
      
      newUrls.splice(index, 1);
      return newUrls;
    });
    
    setImageFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];
    if (!user) {
      toast.error("You must be signed in to upload images");
      return [];
    }

    setIsUploading(true);
    setUploadError(null);
    const uploadedUrls: string[] = [];

    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'properties-images');
      
      if (!bucketExists) {
        await supabase.storage.createBucket('properties-images', {
          public: true,
          fileSizeLimit: 5 * 1024 * 1024
        });
      }

      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
          .from('properties-images')
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading image:", error);
          throw new Error(error.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('properties-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadError("Failed to upload images. Please try again.");
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim() !== "") {
      try {
        new URL(url.trim());
        setImageUrls([...imageUrls, url.trim()]);
        toast.success("Image added successfully");
      } catch (e) {
        toast.error("Please enter a valid URL");
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("You must be signed in to submit a property");
      navigate("/signin");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImageUrls = await uploadImages();
      
      const allImageUrls = [
        ...uploadedImageUrls,
        ...imageUrls.filter(url => url.startsWith('http'))
      ];

      const propertyData = {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        location: values.location,
        bedrooms: values.bedrooms ? Number(values.bedrooms) : null,
        bathrooms: values.bathrooms ? Number(values.bathrooms) : null,
        area: values.area ? Number(values.area) : null,
        type: values.type,
        status: values.status,
        images: allImageUrls
      };

      const result = await db.submitPropertyInfo(user.id, propertyData);

      if (result) {
        toast.success(`Property submitted successfully! You earned ${result.tokensAwarded} tokens.`);
        form.reset();
        setImageUrls([]);
        setImageFiles([]);
        
        setTimeout(() => {
          navigate("/properties");
        }, 2000);
      } else {
        toast.error("Failed to submit property. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      toast.error("An error occurred while submitting the property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-900 text-white">
              <CardTitle className="text-2xl flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Submit Property
              </CardTitle>
              <CardDescription className="text-blue-100">
                Fill in the details below to submit a property and earn tokens
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {!user && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Required</AlertTitle>
                  <AlertDescription>
                    You must be signed in to submit a property. Please <Link to="/signin" className="font-medium underline">sign in</Link> or <Link to="/signup" className="font-medium underline">create an account</Link>.
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxury 3-bedroom apartment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input className="pl-10" placeholder="250000" {...field} />
                            </div>
                          </FormControl>
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
                            placeholder="Provide a detailed description of the property" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
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
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input className="pl-10" placeholder="Lagos, Nigeria" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="3" {...field} />
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
                            <Input type="number" placeholder="2" {...field} />
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
                          <FormLabel>Area (sqft)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="1500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="commercial">Commercial</option>
                            <option value="land">Land</option>
                          </select>
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
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="sale">For Sale</option>
                            <option value="rent">For Rent</option>
                          </select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Property Images</Label>
                    
                    {uploadError && (
                      <Alert variant="destructive" className="mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{uploadError}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Property image ${index + 1}`} 
                            className="h-24 w-24 object-cover rounded-md border border-gray-200"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg"; 
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      
                      {imageUrls.length === 0 && (
                        <div className="h-24 w-24 rounded-md border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                          <p className="text-xs text-center px-2">No images</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="border-dashed flex-grow"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        <Upload className="mr-2 h-4 w-4" /> 
                        Upload Images
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="border-dashed flex-grow"
                        onClick={handleAddImageUrl}
                      >
                        <Image className="mr-2 h-4 w-4" /> 
                        Add Image URL
                      </Button>
                    </div>
                    
                    <FormDescription>
                      Upload images or add URLs. Adding high-quality images increases your token reward. Max 5MB per image.
                    </FormDescription>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Earn Tokens</h3>
                    <p className="text-blue-700 mb-2">
                      Complete the form to earn tokens! More detailed submissions earn more tokens.
                    </p>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" /> Basic information: 10 tokens
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" /> Detailed description: +5 tokens
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" /> Complete specifications: +15 tokens
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" /> Images: up to +20 tokens
                      </li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                    disabled={isSubmitting || isUploading || !user}
                  >
                    {isSubmitting || isUploading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        {isUploading ? "Uploading Images..." : "Submitting..."}
                      </span>
                    ) : (
                      <>Submit Property & Earn Tokens</>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitProperty;
