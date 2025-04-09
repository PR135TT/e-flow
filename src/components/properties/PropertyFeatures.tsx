
import { Bed, ShowerHead, SquareIcon, Home, Calendar } from "lucide-react";

interface PropertyFeaturesProps {
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  type: string;
  createdAt: Date;
}

export function PropertyFeatures({ bedrooms, bathrooms, area, type, createdAt }: PropertyFeaturesProps) {
  const displayFeature = (value: number | null, unit: string) => {
    return value ? `${value} ${unit}` : "N/A";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center">
        <Bed className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-gray-600">{displayFeature(bedrooms, "Bedrooms")}</span>
      </div>
      <div className="flex items-center">
        <ShowerHead className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-gray-600">{displayFeature(bathrooms, "Bathrooms")}</span>
      </div>
      <div className="flex items-center">
        <SquareIcon className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-gray-600">{displayFeature(area, "sqft Area")}</span>
      </div>
      <div className="flex items-center">
        <Home className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-gray-600">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <div className="flex items-center">
        <Calendar className="h-5 w-5 text-blue-500 mr-2" />
        <span className="text-gray-600">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
