import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Search, Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { db, Property } from "@/lib/database";
import { formatCurrency } from "@/lib/utils";
import { Header } from "@/components/Header";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await db.getProperties();
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
    toast.info(`Viewing details for property ${propertyId}`);
    console.log(`Viewing details for property ${propertyId}`);
  };

  const displayFeature = (value: number | null, unit: string) => {
    return value ? `${value} ${unit}` : "N/A";
  };

  const handleUploadProperty = () => {
    navigate('/submit-property');
    toast.info("Navigating to property submission form");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <form onSubmit={handleSearch} className="flex-grow max-w-2xl flex flex-col md:flex-row gap-3">
              <Input 
                className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70" 
                placeholder="Search by location, property type, or price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </form>
            
            <Button 
              onClick={handleUploadProperty}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Upload Property
            </Button>
          </div>
          
          <div className="text-sm text-white/80 mt-2">
            Upload property data and earn tokens! Contribute to our database and be rewarded.
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
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
                  onClick={() => {
                    setSearchQuery("");
                    setFilteredProperties(properties);
                  }}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 overflow-hidden">
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
                    <CardDescription>{property.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">{formatCurrency(property.price)}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-3">{displayFeature(property.bedrooms, "Beds")}</span>
                      <span className="mr-3">{displayFeature(property.bathrooms, "Baths")}</span>
                      <span>{displayFeature(property.area, "sqft")}</span>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-red-500 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
            <Link to="/analytics" className="text-gray-400 hover:text-white mx-2">Analytics</Link>
            <Link to="/tokens" className="text-gray-400 hover:text-white mx-2">Tokens</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Properties;
