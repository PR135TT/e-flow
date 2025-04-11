
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Edit, Loader2, Home, Plus } from "lucide-react";
import { Property } from "@/lib/database/types";
import { getUserSubmittedProperties } from "@/lib/database/queries";
import { EditPropertyForm } from "./EditPropertyForm";
import { LazyImage } from "@/components/ui/lazy-image";

interface UserPropertiesListProps {
  userId: string;
}

export const UserPropertiesList = ({ userId }: UserPropertiesListProps) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchUserProperties = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const userProperties = await getUserSubmittedProperties(userId);
      setProperties(userProperties);
    } catch (error) {
      console.error("Error fetching user properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, [userId]);

  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    fetchUserProperties();
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading your properties...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Properties</h2>
        <Button 
          onClick={() => navigate('/submit-property')} 
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <Home className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
          <p className="mt-1 text-gray-500">You haven't submitted any properties yet.</p>
          <Button 
            onClick={() => navigate('/submit-property')} 
            variant="outline" 
            className="mt-4"
          >
            Submit your first property
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <Card key={property.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden relative">
                {property.images && property.images.length > 0 ? (
                  <LazyImage
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    fallbackIcon={<Home className="h-12 w-12 text-white" />}
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    <Home className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute top-0 right-0 p-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    property.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                <CardDescription>{property.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">₦{property.price?.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="mr-3">{property.bedrooms || 0} Beds</span>
                  <span className="mr-3">{property.bathrooms || 0} Baths</span>
                  <span>{property.area || 0} sqft</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewDetails(property.id)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditClick(property)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update information for your property
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <EditPropertyForm 
              property={selectedProperty} 
              userId={userId} 
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
