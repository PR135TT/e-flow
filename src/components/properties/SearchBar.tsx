
import { useState, useRef, useEffect } from "react";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchDropdown } from "./SearchDropdown";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleUploadProperty: () => void;
}

export const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  handleUploadProperty 
}: SearchBarProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  
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
  
  const handleSelectProperty = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };
  
  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <section className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <form 
            ref={searchFormRef}
            onSubmit={handleSearch} 
            className="flex-grow max-w-2xl flex flex-col md:flex-row gap-3 relative"
            role="form"
          >
            <div className="relative flex-grow">
              <Input 
                className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70" 
                placeholder="Search by location, property type, or price..."
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
  );
};
