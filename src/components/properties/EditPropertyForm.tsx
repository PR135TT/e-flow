
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { PropertyFormData } from './PropertyFormSchema';
import { PropertyForm } from './PropertyForm';
import { useImageUpload } from '@/hooks/useImageUpload';
import { updateProperty } from '@/lib/database/queries';
import { Property, PropertyType, PropertyStatus } from '@/lib/database/types';

export const EditPropertyForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    uploading,
    imageFiles,
    setImageFiles,
    imageUrls,
    setImageUrls,
    bucketExists,
    checkBucket,
    uploadImages
  } = useImageUpload();

  useEffect(() => {
    checkBucket();
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    if (!id) return;
    
    try {
      setLoadingProperty(true);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        throw new Error('Failed to fetch property');
      }
      
      if (data) {
        // Ensure the type and status are correct enum values
        const propertyType = validatePropertyType(data.type);
        const propertyStatus = validatePropertyStatus(data.status);
        
        const transformedProperty: Property = {
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          area: data.area,
          type: propertyType,
          status: propertyStatus,
          images: data.images || [],
          isApproved: data.is_approved,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };
        
        setProperty(transformedProperty);
        setImageUrls(transformedProperty.images || []);
      }
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('Failed to load property information');
      toast.error('Failed to load property information');
    } finally {
      setLoadingProperty(false);
    }
  };

  // Helper function to validate property type
  const validatePropertyType = (type: string): PropertyType => {
    if (['house', 'apartment', 'commercial', 'land'].includes(type)) {
      return type as PropertyType;
    }
    console.warn(`Invalid property type: ${type}, defaulting to 'house'`);
    return 'house';
  };

  // Helper function to validate property status
  const validatePropertyStatus = (status: string): PropertyStatus => {
    if (['sale', 'rent'].includes(status)) {
      return status as PropertyStatus;
    }
    console.warn(`Invalid property status: ${status}, defaulting to 'sale'`);
    return 'sale';
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      
      if (!session) {
        throw new Error('You must be logged in to update a property');
      }
      
      const userId = session.user.id;
      
      // Upload any new images
      let allImageUrls = [...imageUrls.filter(url => !url.startsWith('blob'))];
      
      if (imageFiles.length > 0) {
        toast.info('Uploading new images...');
        const newUploadedUrls = await uploadImages(userId);
        allImageUrls = [...allImageUrls, ...newUploadedUrls];
      }
      
      const updatedProperty = await updateProperty(id, {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        bedrooms: data.bedrooms || null,
        bathrooms: data.bathrooms || null,
        area: data.area || null,
        type: data.type,
        status: data.status,
        images: allImageUrls
      });
      
      if (!updatedProperty) {
        throw new Error('Failed to update property');
      }
      
      toast.success('Property updated successfully');
      navigate(`/property/${id}`);
      
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

  if (loadingProperty) {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container max-w-4xl py-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Property not found'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Property</h1>
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Update Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Property Details</CardTitle>
          <CardDescription>Update your property information</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm
            onSubmit={onSubmit}
            loading={loading}
            uploading={uploading}
            defaultValues={{
              title: property.title,
              description: property.description,
              price: property.price,
              location: property.location,
              bedrooms: property.bedrooms || undefined,
              bathrooms: property.bathrooms || undefined,
              area: property.area || undefined,
              type: property.type,
              status: property.status,
            }}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            bucketExists={bucketExists}
          />
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground text-center">
            All changes will be saved immediately. Property approval status may be affected by significant changes.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
