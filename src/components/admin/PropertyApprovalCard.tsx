
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Home, MapPin } from "lucide-react";
import { Property } from "@/lib/database/types";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { db } from "@/lib/database";

interface PropertyApprovalCardProps {
  property: Property;
  onApproved: (propertyId: string) => void;
  onRejected: (propertyId: string) => void;
  onViewDetails: (propertyId: string) => void;
}

export const PropertyApprovalCard = ({ 
  property, 
  onApproved, 
  onRejected, 
  onViewDetails 
}: PropertyApprovalCardProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    
    try {
      const result = await db.approveProperty(property.id);
      
      if (result.success) {
        // Show a success message that includes the tokens awarded
        toast.success(`Property approved successfully! ${result.tokensAwarded} tokens awarded to user.`);
        onApproved(property.id);
      } else {
        // Display any error messages
        if (result.error) {
          toast.error(`Failed to approve property: ${result.error}`);
        } else {
          toast.error("Failed to approve property");
        }
      }
    } catch (error) {
      console.error("Error approving property:", error);
      toast.error("An error occurred while approving the property");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    
    try {
      const result = await db.rejectProperty(property.id);
      
      if (result.success) {
        toast.success("Property rejected and removed");
        onRejected(property.id);
      } else {
        toast.error("Failed to reject property");
      }
    } catch (error) {
      console.error("Error rejecting property:", error);
      toast.error("An error occurred while rejecting the property");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="overflow-hidden">
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
          onClick={() => onViewDetails(property.id)}
        >
          View Full Details
        </Button>
        
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            variant="outline" 
            className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
            onClick={handleApprove}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-2" />
            )}
            Approve
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
            onClick={handleReject}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <XCircle className="h-4 w-4 mr-2" />
            )}
            Reject
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
