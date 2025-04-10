import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db, Property } from "@/lib/database";
import { ArrowLeft, MapPin } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "@/App";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";
import { Shell } from "@/components/Shell";
import { PropertyImages } from "@/components/properties/PropertyImages";
import { PropertyDetailsTab } from "@/components/properties/PropertyDetailsTab";
import { PropertySidebar } from "@/components/properties/PropertySidebar";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        toast.error("Property ID is missing");
        navigate("/properties");
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching property details for ID:", id);
        const propertyData = await db.getPropertyById(id);
        
        if (!propertyData) {
          console.error("Property data not found for ID:", id);
          toast.error("Property not found");
          navigate("/properties");
          return;
        }
        
        console.log("Property data loaded:", propertyData);
        setProperty(propertyData);
      } catch (error) {
        console.error("Error fetching property details:", error);
        toast.error("Failed to load property details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <Shell>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Shell>
    );
  }

  if (!property) {
    return (
      <Shell>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center min-h-[60vh] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
            <p className="mt-2 text-gray-600">We couldn't find the property you're looking for.</p>
            <Button 
              className="mt-4 mx-auto" 
              onClick={() => navigate("/properties")}
            >
              Return to Properties
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  const agentInfo = {
    name: property.agentName,
    company: property.agentCompany
  };

  return (
    <Shell>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-blue-600"
          onClick={() => navigate("/properties")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-500 mb-6">
              <MapPin className="h-5 w-5 text-red-500 mr-2" />
              <span>{property.location}</span>
            </div>

            <PropertyImages images={property.images} />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-6">
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule Viewing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <PropertyDetailsTab property={property} />
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card>
                  <CardContent className="pt-6">
                    <AppointmentScheduler propertyId={property.id} propertyTitle={property.title} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <PropertySidebar 
            price={property.price}
            status={property.status}
            isLoggedIn={!!user}
            onScheduleClick={() => setActiveTab("schedule")}
            agentInfo={agentInfo}
          />
        </div>
      </div>
    </Shell>
  );
};

export default PropertyDetails;
