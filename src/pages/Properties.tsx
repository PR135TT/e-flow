import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Home, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
    }
  };

  const handleViewDetails = (propertyId: number) => {
    console.log(`Viewing details for Property ${propertyId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Link to="/" className="text-2xl font-bold">E Flow</Link>
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
          </div>
        </div>
      </header>

      {/* Property Listings */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                    <Home className="h-12 w-12" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Luxury Villa {item}</CardTitle>
                  <CardDescription>Lekki, Lagos</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">₦45,000,000</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-3">3 Beds</span>
                    <span className="mr-3">2 Baths</span>
                    <span>1500 sqft</span>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-red-500 mr-1" />
                    <span>Lekki Phase 1, Lagos</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
