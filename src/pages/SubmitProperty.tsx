
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { MapPin, Home, Upload, Image, Check, ChevronDown, DollarSign, SquareArrowDownRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { db } from "@/lib/database";
import { AuthContext } from "@/App";

// Define the form validation schema
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("You must be signed in to submit a property");
      navigate("/signin");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert string values to appropriate types
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
        images: imageUrls
      };

      // Submit the property data
      const result = await db.submitPropertyInfo(user.id, propertyData);

      if (result) {
        toast.success(`Property submitted successfully! You earned ${result.tokensAwarded} tokens.`);
        form.reset();
        setImageUrls([]);
        
        // Navigate back to properties page after a short delay
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

  // Handle image URL input
  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim() !== "") {
      setImageUrls([...imageUrls, url.trim()]);
      toast.success("Image added successfully");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...imageUrls];
    newImages.splice(index, 1);
    setImageUrls(newImages);
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Property image ${index + 1}`} 
                            className="h-24 w-24 object-cover rounded-md border border-gray-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg'; 
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-dashed"
                      onClick={handleAddImageUrl}
                    >
                      <Image className="mr-2 h-4 w-4" /> Add Image URL
                    </Button>
                    <FormDescription>
                      Add URLs for property images. Adding high-quality images increases your token reward.
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
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
