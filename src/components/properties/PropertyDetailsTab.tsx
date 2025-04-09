
import { Property } from "@/lib/database/types";
import { PropertyFeatures } from "./PropertyFeatures";

interface PropertyDetailsTabProps {
  property: Property;
}

export function PropertyDetailsTab({ property }: PropertyDetailsTabProps) {
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
    </div>
  );
}
