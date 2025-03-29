
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  return (
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
  );
};
