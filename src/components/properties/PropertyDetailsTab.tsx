
import { Property } from "@/lib/database/types";
import { PropertyFeatures } from "./PropertyFeatures";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Heart, Home, Landmark, Calendar } from "lucide-react";

interface PropertyDetailsTabProps {
  property: Property;
}

export function PropertyDetailsTab({ property }: PropertyDetailsTabProps) {
  // Format property creation date
  const formattedDate = new Date(property.createdAt).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
        <PropertyFeatures 
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
          type={property.type}
          createdAt={property.createdAt}
        />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-gray-700 mb-2">
              <Home className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Property Type:</span>
            </div>
            <p className="text-gray-600 ml-7">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-gray-700 mb-2">
              <Landmark className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Price:</span>
            </div>
            <p className="text-gray-600 ml-7">{formatCurrency(property.price)}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-gray-700 mb-2">
              <Heart className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Status:</span>
            </div>
            <p className="text-gray-600 ml-7 flex items-center">
              <Badge variant="outline" className="mr-2 capitalize">
                For {property.status}
              </Badge>
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-gray-700 mb-2">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium">Listed On:</span>
            </div>
            <p className="text-gray-600 ml-7">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
