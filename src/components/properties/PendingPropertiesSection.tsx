
import { Loader2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/database/types";
import { PropertyCard } from "./PropertyCard";

interface PendingPropertiesSectionProps {
  pendingProperties: Property[];
  isPendingLoading: boolean;
  handleViewDetails: (propertyId: string) => void;
  onPropertyUpdated?: (propertyId: string, approved: boolean) => void;
}

export const PendingPropertiesSection = ({
  pendingProperties,
  isPendingLoading,
  handleViewDetails,
  onPropertyUpdated
}: PendingPropertiesSectionProps) => {
  if (!pendingProperties.length && !isPendingLoading) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Pending Submissions</h2>
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center gap-1 px-3 py-1">
          <Clock className="h-4 w-4 mr-1" /> Awaiting Approval
        </Badge>
      </div>
      
      {isPendingLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2">Loading your submissions...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingProperties.map(property => (
            <PropertyCard 
              key={property.id}
              property={property} 
              isPending={true}
              onViewDetails={handleViewDetails}
              onPropertyUpdated={onPropertyUpdated}
            />
          ))}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500 bg-gray-100 p-4 rounded-md">
        <p>Your property submissions are under review by our team. Once approved, they will appear in the Available Properties section below.</p>
      </div>
    </div>
  );
};
