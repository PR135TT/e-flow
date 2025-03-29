
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Home, MapPin } from "lucide-react";
import { db, Property } from "@/lib/database";
import { AuthContext } from "@/App";
import { formatCurrency } from "@/lib/utils";
import { useAdmin } from "@/hooks/useAdmin";

const PropertyApproval = () => {
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!user) {
      navigate('/signin');
      toast.error("You must be logged in to access this page");
      return;
    }

    // Fetch pending properties
    const fetchPendingProperties = async () => {
      try {
        const properties = await db.getPendingProperties();
        setPendingProperties(properties);
      } catch (error) {
        console.error("Error fetching pending properties:", error);
        toast.error("Failed to load pending properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingProperties();
  }, [user, navigate]);

  // If not an admin, redirect to admin application page
  useEffect(() => {
    if (!isAdminLoading && !isAdmin && user) {
      navigate('/admin-application');
      toast.error("You need administrator privileges to access this page");
    }
  }, [isAdmin, isAdminLoading, user, navigate]);

  const handleApprove = async (propertyId: string) => {
    setProcessingIds(prev => [...prev, propertyId]);
    
    try {
      const result = await db.approveProperty(propertyId);
      
      if (result.success) {
        toast.success(`Property approved successfully! ${result.tokensAwarded} tokens awarded to user.`);
        // Remove the approved property from the list
        setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      } else {
        toast.error("Failed to approve property");
      }
    } catch (error) {
      console.error("Error approving property:", error);
      toast.error("An error occurred while approving the property");
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== propertyId));
    }
  };

  const handleReject = async (propertyId: string) => {
    setProcessingIds(prev => [...prev, propertyId]);
    
    try {
      const result = await db.rejectProperty(propertyId);
      
      if (result.success) {
        toast.success("Property rejected and removed");
        // Remove the rejected property from the list
        setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
      } else {
        toast.error("Failed to reject property");
      }
    } catch (error) {
      console.error("Error rejecting property:", error);
      toast.error("An error occurred while rejecting the property");
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== propertyId));
    }
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  if (isAdminLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex justify-center items-center py-12 flex-grow">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will be redirected by the useEffect hook
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Property Approval Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Review and approve pending property submissions
          </p>
        </div>

        {pendingProperties.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">All Caught Up!</h2>
            <p className="text-gray-600">
              There are currently no properties waiting for approval.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  <Badge variant="outline" className="absolute top-2 right-2 z-10 bg-yellow-100 text-yellow-800 border-yellow-300">
                    Pending Approval
                  </Badge>
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      <Home className="h-12 w-12" />
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-red-500" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="font-semibold text-lg">{formatCurrency(property.price)}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-3">{property.bedrooms || 'N/A'} Beds</span>
                    <span className="mr-3">{property.bathrooms || 'N/A'} Baths</span>
                    <span>{property.area ? `${property.area} sqft` : 'N/A'}</span>
                  </div>
                  
                  <div className="mt-4 line-clamp-3 text-sm text-gray-600">
                    {property.description}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-3">
                  <Button 
                    className="w-full"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    View Full Details
                  </Button>
                  
                  {isAdmin && (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Button 
                        variant="outline" 
                        className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                        onClick={() => handleApprove(property.id)}
                        disabled={processingIds.includes(property.id)}
                      >
                        {processingIds.includes(property.id) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        )}
                        Approve
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                        onClick={() => handleReject(property.id)}
                        disabled={processingIds.includes(property.id)}
                      >
                        {processingIds.includes(property.id) ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-2" />
                        )}
                        Reject
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyApproval;
