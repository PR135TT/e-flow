
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Property } from "@/lib/database/types";
import { db } from "@/lib/database";
import { Header } from "@/components/Header";
import { PageFooter } from "@/components/PageFooter";
import { SearchBar } from "@/components/properties/SearchBar";
import { PendingPropertiesSection } from "@/components/properties/PendingPropertiesSection";
import { AvailablePropertiesSection } from "@/components/properties/AvailablePropertiesSection";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPendingLoading, setIsPendingLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await db.getProperties();
        console.log("Fetched properties:", propertiesData);
        setProperties(propertiesData);
        setFilteredProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchPendingProperties = async () => {
      if (!user) {
        setIsPendingLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('is_approved', false)
          .eq('owner_id', user.id);
          
        if (error) {
          console.error("Error fetching pending properties:", error);
          return;
        }
        
        const pendingPropertiesData = data.map(property => ({
          id: property.id,
          title: property.title,
          description: property.description,
          price: Number(property.price),
          location: property.location,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.area ? Number(property.area) : null,
          type: property.type,
          status: property.status,
          images: property.images || [],
          ownerId: property.owner_id,
          agentId: property.agent_id,
          companyId: property.company_id,
          isApproved: property.is_approved,
          createdAt: new Date(property.created_at),
          updatedAt: new Date(property.updated_at)
        } as Property));
        
        setPendingProperties(pendingPropertiesData);
      } catch (error) {
        console.error("Error fetching pending properties:", error);
      } finally {
        setIsPendingLoading(false);
      }
    };

    fetchPendingProperties();
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = properties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.price.toString().includes(searchQuery)
      );
      
      setFilteredProperties(filtered);
      
      if (filtered.length === 0) {
        toast.info("No properties found matching your search criteria");
      } else {
        toast.success(`Found ${filtered.length} properties matching "${searchQuery}"`);
      }
    } else {
      setFilteredProperties(properties);
    }
  };

  const handleViewDetails = (propertyId: string) => {
    console.log("Navigating to property details for ID:", propertyId);
    navigate(`/property/${propertyId}`);
  };

  const handleUploadProperty = () => {
    navigate('/submit-property');
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProperties(properties);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleUploadProperty={handleUploadProperty}
      />

      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          {user && (
            <PendingPropertiesSection 
              pendingProperties={pendingProperties}
              isPendingLoading={isPendingLoading}
              handleViewDetails={handleViewDetails}
            />
          )}
          
          <AvailablePropertiesSection 
            filteredProperties={filteredProperties}
            isLoading={isLoading}
            searchQuery={searchQuery}
            handleViewDetails={handleViewDetails}
            handleUploadProperty={handleUploadProperty}
            clearSearch={clearSearch}
            onPropertyUpdated={setPendingProperties.length > 0 ? () => {} : undefined}
          />
        </div>
      </section>

      <PageFooter />
    </div>
  );
};

export default Properties;
