
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { db } from "@/lib/database";
import { toast } from "sonner";
import { Property } from "@/lib/database/types";

interface PropertyApprovalActionsProps {
  property: Property;
  onPropertyUpdated: (propertyId: string, approved: boolean) => void;
}

export const PropertyApprovalActions = ({ property, onPropertyUpdated }: PropertyApprovalActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      const result = await db.approveProperty(property.id);
      
      if (result.success) {
        toast.success(`Property approved successfully! ${result.tokensAwarded} tokens awarded to user.`);
        onPropertyUpdated(property.id, true);
      } else {
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
        onPropertyUpdated(property.id, false);
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

  if (property.isApproved) {
    return null;
  }

  return (
    <div className="flex space-x-2 mt-3">
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
  );
};
