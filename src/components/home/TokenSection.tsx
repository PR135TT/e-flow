
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TokenSection = () => {
  const navigate = useNavigate();
  
  const handleTokenClick = (action: string) => {
    if (action === "Learn About Tokens" || action === "Property Tokens") {
      navigate('/tokens');
    }
  };

  return (
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
            onClick={() => handleTokenClick("Learn About Tokens")}
          >
            <Coins className="mr-2 h-4 w-4" /> Learn About Tokens
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Card 
            className="w-64 h-64 flex items-center justify-center bg-white/90 backdrop-blur-sm cursor-pointer" 
            onClick={() => handleTokenClick("Property Tokens")}
          >
            <CardContent>
              <Coins className="h-24 w-24 text-yellow-500 mx-auto" />
              <p className="text-center mt-4 font-bold text-lg">Property Tokens</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
