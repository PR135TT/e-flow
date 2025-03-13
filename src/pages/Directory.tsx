
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, User2, MapPin, Users2, Search, Phone, Mail, Home, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { db } from "@/lib/database";

// Page that shows real estate agents, companies, buyers and sellers
const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("agents");

  // Query to fetch the data based on active tab
  const { data, isLoading } = useQuery({
    queryKey: ['directory', activeTab],
    queryFn: () => db.getDirectoryData(activeTab, searchQuery),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}" in ${activeTab}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleContact = (name: string, type: string) => {
    toast.success(`Contact request sent to ${name}`);
  };

  // Render different cards based on the active tab
  const renderCards = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-blue-600">Loading...</div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No {activeTab} found. Try a different search.</p>
        </div>
      );
    }

    if (activeTab === "companies") {
      return data.map((company: any, index: number) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </Avatar>
              <div>
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>{company.type}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-red-500 mr-1" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users2 className="h-4 w-4 text-blue-500 mr-1" />
                <span>{company.agentCount} agents</span>
              </div>
              <div className="flex items-center text-sm">
                <Home className="h-4 w-4 text-green-500 mr-1" />
                <span>{company.listingCount} listings</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: company.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button 
              className="w-full" 
              onClick={() => handleContact(company.name, "company")}
            >
              Contact Company
            </Button>
            <Button variant="outline" className="w-full">
              View Listings
            </Button>
          </CardFooter>
        </Card>
      ));
    }

    return data.map((person: any, index: number) => (
      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-blue-100">
              <User2 className="h-6 w-6 text-blue-600" />
            </Avatar>
            <div>
              <CardTitle>{person.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant={activeTab === "agents" ? "default" : "outline"}>
                  {activeTab === "agents" ? "Agent" : activeTab === "buyers" ? "Buyer" : "Seller"}
                </Badge>
                {person.tokens && (
                  <Badge variant="outline" className="bg-yellow-50">
                    {person.tokens} tokens
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-red-500 mr-1" />
              <span>{person.location}</span>
            </div>
            {person.company && (
              <div className="flex items-center text-sm">
                <Building2 className="h-4 w-4 text-blue-500 mr-1" />
                <span>{person.company}</span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-green-500 mr-1" />
              <span>{person.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-purple-500 mr-1" />
              <span>{person.email}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => handleContact(person.name, activeTab === "agents" ? "agent" : activeTab === "buyers" ? "buyer" : "seller")}
          >
            Contact {activeTab === "agents" ? "Agent" : activeTab === "buyers" ? "Buyer" : "Seller"}
          </Button>
        </CardFooter>
      </Card>
    ));
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
                placeholder="Search for agents, companies, buyers, or sellers..."
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

      {/* Main Content */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Direct Communication</h1>
          <p className="mb-8 text-gray-600">
            Connect directly with real estate agents, companies, buyers, and sellers without intermediaries.
          </p>

          <Tabs defaultValue="agents" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 md:w-[400px]">
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="buyers-sellers">Buyers & Sellers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="agents" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCards()}
            </TabsContent>
            
            <TabsContent value="companies" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCards()}
            </TabsContent>
            
            <TabsContent value="buyers-sellers" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCards()}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
            <Link to="/properties" className="text-gray-400 hover:text-white mx-2">Properties</Link>
            <Link to="/analytics" className="text-gray-400 hover:text-white mx-2">Analytics</Link>
            <Link to="/tokens" className="text-gray-400 hover:text-white mx-2">Tokens</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Directory;
