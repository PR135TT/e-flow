
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SearchDropdown } from "@/components/properties/SearchDropdown";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show dropdown if user has typed at least 2 characters
    setIsDropdownVisible(searchQuery.length >= 2);
    
    // Click outside listener to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"`);
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleUploadProperty = () => {
    navigate('/submit-property');
  };
  
  const handleSelectProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };
  
  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <section className={`relative ${isMobile ? 'h-[50vh]' : 'h-[55vh]'} bg-gradient-to-r from-blue-900 to-purple-900 text-white`}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 pt-4 container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-2xl font-bold">E Flow</Link>
          <div>
            <AuthStatus />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-start pt-6">
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
            Euron <span className="text-yellow-400">Estate</span>
          </h1>
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-xl'} mb-4 md:mb-6 max-w-2xl`}>
            Discover transparent property listings, market analytics, and connect directly with agents across Nigeria.
          </p>
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-lg flex flex-col md:flex-row gap-3">
            <form 
              ref={searchFormRef}
              onSubmit={handleSearch} 
              className="flex-grow max-w-4xl flex flex-col md:flex-row gap-3 relative"
            >
              <div className="relative flex-grow">
                <Input 
                  className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70 md:min-w-[500px] lg:min-w-[600px]" 
                  placeholder={isMobile ? "Search properties..." : "Search by location, property type, price range, or any property details..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length >= 2) {
                      setIsDropdownVisible(true);
                    }
                  }}
                />
                
                <SearchDropdown 
                  searchQuery={searchQuery}
                  isVisible={isDropdownVisible}
                  onSelectProperty={handleSelectProperty}
                  onClose={closeDropdown}
                />
              </div>
              
              <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Search className="mr-2 h-4 w-4" /> {isMobile ? "Search" : "Search Properties"}
              </Button>
            </form>
            <Button 
              onClick={handleUploadProperty}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> {isMobile ? "Upload" : "Upload Property"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
