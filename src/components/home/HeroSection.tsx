
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"`);
      navigate('/properties');
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleUploadProperty = () => {
    navigate('/submit-property');
  };

  return (
    <section className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 pt-6 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-2xl font-bold">E Flow</Link>
          <div>
            <AuthStatus />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-start pt-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Euron <span className="text-yellow-400">Estate</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover transparent property listings, market analytics, and connect directly with agents across Nigeria.
          </p>
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-4 rounded-lg flex flex-col md:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex-grow max-w-4xl flex flex-col md:flex-row gap-3">
              <Input 
                className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70 md:min-w-[500px] lg:min-w-[600px]" 
                placeholder="Search by location, property type, price range, or any property details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Search className="mr-2 h-4 w-4" /> Search Properties
              </Button>
            </form>
            <Button 
              onClick={handleUploadProperty}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Upload Property
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
