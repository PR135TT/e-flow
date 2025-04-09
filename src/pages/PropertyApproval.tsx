
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { toast } from "sonner";
import { db, Property } from "@/lib/database";
import { AuthContext } from "@/App";
import { useAdmin } from "@/hooks/useAdmin";
import { PropertyApprovalGrid } from "@/components/admin/PropertyApprovalGrid";
import { EmptyApprovalState } from "@/components/admin/EmptyApprovalState";
import { ApprovalLoading } from "@/components/admin/ApprovalLoading";

const PropertyApproval = () => {
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in
    if (!user) {
      navigate('/signin');
      toast.error("You must be logged in to access this page");
      return;
    }

    // Fetch pending properties
    const fetchPendingProperties = async () => {
      try {
        const properties = await db.getPendingProperties();
        setPendingProperties(properties);
      } catch (error) {
        console.error("Error fetching pending properties:", error);
        toast.error("Failed to load pending properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingProperties();
  }, [user, navigate]);

  // If not an admin, redirect to admin application page
  useEffect(() => {
    if (!isAdminLoading && !isAdmin && user) {
      navigate('/admin-application');
      toast.error("You need administrator privileges to access this page");
    }
  }, [isAdmin, isAdminLoading, user, navigate]);

  const handlePropertyApproved = (propertyId: string) => {
    // Remove the approved property from the list
    setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const handlePropertyRejected = (propertyId: string) => {
    // Remove the rejected property from the list
    setPendingProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  // Show loading state
  if (isAdminLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <ApprovalLoading />
      </div>
    );
  }

  // Redirect if not an admin
  if (!isAdmin) {
    return null; // Will be redirected by the useEffect hook
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Property Approval Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Review and approve pending property submissions
          </p>
        </div>

        {pendingProperties.length === 0 ? (
          <EmptyApprovalState />
        ) : (
          <PropertyApprovalGrid 
            properties={pendingProperties}
            onPropertyApproved={handlePropertyApproved}
            onPropertyRejected={handlePropertyRejected}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyApproval;
