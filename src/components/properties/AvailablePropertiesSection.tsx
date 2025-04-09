
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/database/types";
import { PropertyCard } from "./PropertyCard";

interface AvailablePropertiesSectionProps {
  filteredProperties: Property[];
  isLoading: boolean;
  searchQuery: string;
  handleViewDetails: (propertyId: string) => void;
  handleUploadProperty: () => void;
  clearSearch: () => void;
  onPropertyUpdated?: (propertyId: string, approved: boolean) => void;
}

export const AvailablePropertiesSection = ({
  filteredProperties,
  isLoading,
  searchQuery,
  handleViewDetails,
  handleUploadProperty,
  clearSearch,
  onPropertyUpdated
}: AvailablePropertiesSectionProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Properties</h1>
        
        <Button 
          variant="outline"
          onClick={handleUploadProperty}
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Submit Your Property
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg">Loading properties...</span>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No properties found. Please try a different search.</p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={clearSearch}
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard 
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
              onPropertyUpdated={onPropertyUpdated}
            />
          ))}
        </div>
      )}
    </>
  );
};
