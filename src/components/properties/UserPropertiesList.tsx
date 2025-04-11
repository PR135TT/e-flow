
// Update the UserPropertiesList component to fix the property name issues
import { useState, useEffect } from "react";
import { Property } from "@/lib/database/types";
import { getUserSubmittedProperties } from "@/lib/database/queries";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit2, MapPin, Trash2, CircleCheck, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface UserPropertiesListProps {
  userId: string;
}

export const UserPropertiesList = ({ userId }: UserPropertiesListProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const userProperties = await getUserSubmittedProperties(userId);
        setProperties(userProperties);
        setError(null);
      } catch (err) {
        console.error("Error fetching user properties:", err);
        setError("Failed to load your properties. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your properties",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProperties();
    }
  }, [userId, toast]);

  const handleEditProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}/edit`);
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-pulse flex flex-col space-y-4 w-full max-w-3xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-40 w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Error Loading Properties</h3>
        <p className="mt-2 text-gray-500">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">No Properties Found</h3>
        <p className="mt-2 text-gray-500">
          You haven't submitted any properties yet.
        </p>
        <Button
          className="mt-4"
          onClick={() => navigate("/submit-property")}
        >
          Submit a Property
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Submitted Properties</h2>
        <Button
          onClick={() => navigate("/submit-property")}
        >
          Submit New Property
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <Badge variant={property.isApproved ? "success" : "outline"}>
                  {property.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <div className="bg-gray-100 rounded-md px-3 py-1">
                  Price: ${property.price.toLocaleString()}
                </div>
                {property.bedrooms && (
                  <div className="bg-gray-100 rounded-md px-3 py-1">
                    Bedrooms: {property.bedrooms}
                  </div>
                )}
                {property.bathrooms && (
                  <div className="bg-gray-100 rounded-md px-3 py-1">
                    Bathrooms: {property.bathrooms}
                  </div>
                )}
                <div className="bg-gray-100 rounded-md px-3 py-1">
                  Type: {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </div>
                <div className="bg-gray-100 rounded-md px-3 py-1">
                  Status: {property.status === "sale" ? "For Sale" : "For Rent"}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center">
                  {property.isApproved ? (
                    <CircleCheck className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <Clock className="h-4 w-4 text-orange-500 mr-1" />
                  )}
                  <span>
                    {property.isApproved
                      ? "Approved and visible to all users"
                      : "Pending approval by admin"}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProperty(property.id)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
