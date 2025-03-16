
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Home, TrendingUp, MessageCircle, Coins, Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { getPropertiesByQuery } from "@/lib/database";
import { PropertyType } from "@/lib/database.types";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setIsLoading(true);
        const properties = await getPropertiesByQuery({ limit: 5 });
        setFeaturedProperties(properties);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"`);
      navigate('/properties');
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleButtonClick = (action: string) => {
    console.log(`${action} clicked`);
    
    // Navigate based on the action
    if (action === "Comprehensive Listings") {
      navigate('/properties');
    } else if (action === "Market Analytics") {
      navigate('/analytics');
    } else if (action === "Interactive Maps") {
      navigate('/properties');
    } else if (action === "Direct Communication") {
      navigate('/directory');
    } else if (action.includes("Property")) {
      navigate('/properties');
    } else if (action === "Learn About Tokens" || action === "Property Tokens") {
      navigate('/tokens');
    } else if (action === "Explore Market Data") {
      navigate('/analytics');
    } else if (action === "Sign Up") {
      navigate('/signup');
    } else if (action === "Sign In") {
      navigate('/signup');
    } else if (action === "Learn More") {
      toast.info("Learn more functionality coming soon");
    }
  };

  const handleNavLinkClick = (destination: string) => {
    if (destination === "Home") {
      navigate('/');
    } else if (destination === "Properties") {
      navigate('/properties');
    } else if (destination === "Analytics") {
      navigate('/analytics');
    } else if (destination === "Token System") {
      navigate('/tokens');
    } else if (destination === "Blog") {
      navigate('/blog');
    } else if (destination === "Market Reports") {
      navigate('/analytics');
    } else if (destination === "Help Center") {
      toast.info("Help Center coming soon");
    }
  };

  // Format price with naira symbol and commas
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Euron <span className="text-yellow-400">Estate</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover transparent property listings, market analytics, and connect directly with agents across Nigeria.
          </p>
          <form onSubmit={handleSearch} className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-4 rounded-lg flex flex-col md:flex-row gap-3">
            <Input 
              className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70" 
              placeholder="Search by location, property type, or price..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Search className="mr-2 h-4 w-4" /> Search Properties
            </Button>
          </form>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleButtonClick("Comprehensive Listings")}>
              <CardHeader>
                <Home className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Comprehensive Listings</CardTitle>
                <CardDescription>Detailed property information with photos, videos, and amenities</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleButtonClick("Market Analytics")}>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Market Analytics</CardTitle>
                <CardDescription>Price trends and investment potential analysis</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleButtonClick("Interactive Maps")}>
              <CardHeader>
                <MapPin className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Interactive Maps</CardTitle>
                <CardDescription>Explore properties by location with detailed neighborhood data</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleButtonClick("Direct Communication")}>
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Direct Communication</CardTitle>
                <CardDescription>Connect with agents, buyers, and sellers without intermediaries</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Incentive Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Earn Rewards with Our Token System</h2>
            <p className="text-lg mb-6">
              Get rewarded for contributing property data, writing reviews, and engaging with our platform. 
              Our token system provides real value for your participation.
            </p>
            <Button 
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => handleButtonClick("Learn About Tokens")}
            >
              <Coins className="mr-2 h-4 w-4" /> Learn About Tokens
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Card className="w-64 h-64 flex items-center justify-center bg-white/90 backdrop-blur-sm cursor-pointer" onClick={() => handleButtonClick("Property Tokens")}>
              <CardContent>
                <Coins className="h-24 w-24 text-yellow-500 mx-auto" />
                <p className="text-center mt-4 font-bold text-lg">Property Tokens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <p>Loading properties...</p>
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
            </div>
          )}
        </div>
      </section>

      {/* Market Analytics Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Market Analytics</h2>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Property Price Trends in Lagos</h3>
            <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Our platform provides comprehensive market analytics to help you make informed investment decisions.
              Track price trends, compare neighborhoods, and identify high-potential areas.
            </p>
            <Button onClick={() => handleButtonClick("Explore Market Data")}>Explore Market Data</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Euron Estate for reliable Nigerian real estate data
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-6"
              onClick={() => handleButtonClick("Sign Up")}
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => handleButtonClick("Sign In")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Euron Estate</h3>
              <p className="text-gray-400">The go-to platform for transparent real estate data in Nigeria</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
                <li><Link to="/analytics" className="text-gray-400 hover:text-white">Analytics</Link></li>
                <li><Link to="/tokens" className="text-gray-400 hover:text-white">Token System</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/analytics" className="text-gray-400 hover:text-white">Market Reports</Link></li>
                <li><button onClick={() => handleNavLinkClick("Help Center")} className="text-gray-400 hover:text-white">Help Center</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Lagos, Nigeria</li>
                <li className="text-gray-400">info@euronestate.com</li>
                <li className="text-gray-400">+234 123 456 7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Euron Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
