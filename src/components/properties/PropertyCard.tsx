
import { MapPin, Home, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/lib/database/types";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  isPending?: boolean;
  onViewDetails: (propertyId: string) => void;
}

export const PropertyCard = ({ property, isPending = false, onViewDetails }: PropertyCardProps) => {
  const displayFeature = (value: number | null, unit: string) => {
    return value ? `${value} ${unit}` : "N/A";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 overflow-hidden relative">
        {isPending && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Pending Approval
            </Badge>
          </div>
        )}
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
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg">{formatCurrency(property.price)}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="mr-3">{displayFeature(property.bedrooms, "Beds")}</span>
          <span className="mr-3">{displayFeature(property.bathrooms, "Baths")}</span>
          <span>{displayFeature(property.area, "sqft")}</span>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <MapPin className="h-4 w-4 text-red-500 mr-1" />
          <span>{property.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => onViewDetails(property.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
