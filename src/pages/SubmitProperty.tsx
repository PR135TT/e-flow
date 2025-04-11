
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { db } from '@/lib/database';
import { supabase } from '@/lib/supabase';
import { AuthContext } from '@/App';
import { PropertyForm } from '@/components/properties/PropertyForm';
import { SubmissionResult } from '@/components/properties/SubmissionResult';
import { PropertyFormData } from '@/components/properties/PropertyFormSchema';
import { useImageUpload } from '@/hooks/useImageUpload';

const SubmitProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
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
    if (!user) {
      toast.error("Please sign in to submit property information", {
        description: "You need to be logged in to submit property data",
        duration: 4000,
      });
      navigate("/signin", { state: { returnTo: "/submit-property" } });
    }
  }, [user, navigate]);

  useEffect(() => {
    checkBucket();
  }, []);

  const onSubmit = async (data: PropertyFormData) => {
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
        <SubmissionResult tokensAwarded={submissionResult.tokensAwarded} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Fill out the form with accurate property information</CardDescription>
          </CardHeader>
          <CardContent>
            <PropertyForm
              onSubmit={onSubmit}
              loading={loading}
              uploading={uploading}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              bucketExists={bucketExists}
            />
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
