
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, TrendingUp, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    if (feature === "Comprehensive Listings") {
      navigate('/properties');
    } else if (feature === "Market Analytics") {
      navigate('/analytics');
    } else if (feature === "Interactive Maps") {
      navigate('/properties');
    } else if (feature === "Direct Communication") {
      navigate('/directory');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => handleFeatureClick("Comprehensive Listings")}
          >
            <CardHeader>
              <Home className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Comprehensive Listings</CardTitle>
              <CardDescription>Detailed property information with photos, videos, and amenities</CardDescription>
            </CardHeader>
          </Card>
          
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => handleFeatureClick("Market Analytics")}
          >
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Market Analytics</CardTitle>
              <CardDescription>Price trends and investment potential analysis</CardDescription>
            </CardHeader>
          </Card>
          
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => handleFeatureClick("Interactive Maps")}
          >
            <CardHeader>
              <MapPin className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Interactive Maps</CardTitle>
              <CardDescription>Explore properties by location with detailed neighborhood data</CardDescription>
            </CardHeader>
          </Card>
          
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => handleFeatureClick("Direct Communication")}
          >
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Direct Communication</CardTitle>
              <CardDescription>Connect with agents, buyers, and sellers without intermediaries</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};
