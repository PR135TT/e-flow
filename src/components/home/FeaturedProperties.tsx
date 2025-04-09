
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Home, PlusCircle } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getPropertiesByQuery } from "@/lib/database";
import { PropertyType } from "@/lib/database.types";
import { useNavigate } from "react-router-dom";

export const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const properties = await getPropertiesByQuery({ limit: 5 });
        console.log("Fetched properties:", properties);
        setFeaturedProperties(properties);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError("Failed to load properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleButtonClick = (action: string) => {
    if (action === "Upload Property") {
      navigate('/submit-property');
    } else if (action.includes("View Property") || action.includes("View Details")) {
      // Extract property ID from the action string
      const match = action.match(/Property (\d+)/);
      if (match && match[1]) {
        navigate(`/property/${match[1]}`);
      }
    }
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <Button 
            onClick={() => handleButtonClick("Upload Property")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Upload Property
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : featuredProperties.length > 0 ? (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredProperties.map((property) => (
                <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="cursor-pointer" onClick={() => handleButtonClick(`View Property ${property.id}`)}>
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                      <Home className="h-12 w-12" />
                    </div>
                    <CardHeader>
                      <CardTitle>{property.title}</CardTitle>
                      <CardDescription>{property.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{formatPrice(Number(property.price))}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-3">{property.bedrooms || 0} Beds</span>
                        <span className="mr-3">{property.bathrooms || 0} Baths</span>
                        <span>{property.area || 0} sqft</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(`View Details of Property ${property.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <div className="text-center">
            <p>No properties available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">Check if there are approved properties in the database.</p>
          </div>
        )}
      </div>
    </section>
  );
};
