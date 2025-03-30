
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db, Property } from "@/lib/database";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Home, ShowerHead, Bed, SquareIcon } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/App";
import { AppointmentScheduler } from "@/components/appointments/AppointmentScheduler";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        toast.error("Property ID is missing");
        navigate("/properties");
        return;
      }

      try {
        setIsLoading(true);
        const propertyData = await db.getPropertyById(id);
        
        if (!propertyData) {
          toast.error("Property not found");
          navigate("/properties");
          return;
        }
        
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
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
            <p className="mt-2 text-gray-600">We couldn't find the property you're looking for.</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate("/properties")}
            >
              Return to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayFeature = (value: number | null, unit: string) => {
    return value ? `${value} ${unit}` : "N/A";
  };

  const handleScheduleClick = () => {
    if (!user) {
      toast.error("Please sign in to schedule a viewing", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin?redirect=" + encodeURIComponent(window.location.pathname)),
        },
      });
      return;
    }
    
    setActiveTab("schedule");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
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

            {property.images && property.images.length > 0 ? (
              <Card className="mb-8 overflow-hidden">
                <CardContent className="p-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {property.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="overflow-hidden rounded-lg h-[300px] md:h-[400px] lg:h-[500px]">
                              <img 
                                src={image} 
                                alt={`Property image ${index + 1}`} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/placeholder.svg";
                                }}
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            ) : (
              <div className="mb-8 rounded-lg h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center">
                <Home className="h-16 w-16 text-gray-400" />
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-2 w-full md:w-[400px] mb-6">
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="schedule">Schedule Viewing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">{displayFeature(property.bedrooms, "Bedrooms")}</span>
                    </div>
                    <div className="flex items-center">
                      <ShowerHead className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">{displayFeature(property.bathrooms, "Bathrooms")}</span>
                    </div>
                    <div className="flex items-center">
                      <SquareIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">{displayFeature(property.area, "sqft Area")}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">
                        {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
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

          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {formatCurrency(property.price)}
                </div>
                <div className="mb-4">
                  <span className="text-gray-500">Status: </span>
                  <span className="font-semibold">
                    For {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <Button className="w-full" onClick={handleScheduleClick}>Schedule Viewing</Button>
                  <Button variant="outline" className="w-full">Contact Agent</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span>+234 123 456 7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <span>info@eflow.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetails;
