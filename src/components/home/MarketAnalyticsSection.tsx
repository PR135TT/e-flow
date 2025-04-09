
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MarketAnalyticsSection = () => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    navigate('/analytics');
  };

  return (
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
          <Button onClick={handleExploreClick}>Explore Market Data</Button>
        </div>
      </div>
    </section>
  );
};
