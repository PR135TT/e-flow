
import { Property } from "@/lib/database/types";
import { PropertyApprovalCard } from "./PropertyApprovalCard";

interface PropertyApprovalGridProps {
  properties: Property[];
  onPropertyApproved: (propertyId: string) => void;
  onPropertyRejected: (propertyId: string) => void;
  onViewDetails: (propertyId: string) => void;
}

export const PropertyApprovalGrid = ({
  properties,
  onPropertyApproved,
  onPropertyRejected,
  onViewDetails
}: PropertyApprovalGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {properties.map((property) => (
        <PropertyApprovalCard
          key={property.id}
          property={property}
          onApproved={onPropertyApproved}
          onRejected={onPropertyRejected}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
