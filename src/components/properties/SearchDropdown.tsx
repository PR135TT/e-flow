
import { useState, useEffect } from "react";
import { Property } from "@/lib/database/types";
import { Search, MapPin, Home, Tag, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface SearchDropdownProps {
  searchQuery: string;
  isVisible: boolean;
  onSelectProperty: (propertyId: string) => void;
  onClose: () => void;
}

export const SearchDropdown = ({ 
  searchQuery, 
  isVisible, 
  onSelectProperty,
  onClose
}: SearchDropdownProps) => {
  const [results, setResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        // Get properties matching the search query
        const { getPropertiesByQuery } = await import("@/lib/database/queries");
        const properties = await getPropertiesByQuery({ location: searchQuery, limit: 5 });
        console.log("Search results:", properties);
        setResults(properties);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce the search to avoid too many requests
    const timer = setTimeout(() => {
      fetchSearchResults();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isVisible) return null;
  
  const viewAllResults = () => {
    navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    onClose();
  };
  
  const handleSelectProperty = (propertyId: string) => {
    onSelectProperty(propertyId);
    onClose();
  };
  
  return (
    <Card className="absolute top-full left-0 right-0 mt-1 z-50 border shadow-lg max-h-96 overflow-y-auto bg-white">
      <div className="p-2 flex justify-between items-center border-b">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Search className="h-4 w-4" />
          <span>Search results for "{searchQuery}"</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {isLoading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-pulse flex items-center justify-center">
            <Search className="h-5 w-5 mr-2" />
            <span>Searching...</span>
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No properties found matching "{searchQuery}"
        </div>
      ) : (
        <>
          <ul className="divide-y">
            {results.map((property) => (
              <li 
                key={property.id} 
                className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3"
                onClick={() => handleSelectProperty(property.id)}
              >
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {property.images && property.images.length > 0 ? (
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-sm truncate">{property.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-600">{formatCurrency(property.price)}</span>
                    {property.type && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {property.type}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-2 border-t">
            <Button 
              variant="outline" 
              className="w-full text-sm" 
              onClick={viewAllResults}
            >
              View all results
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
