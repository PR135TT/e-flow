
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyContactInfo } from "./PropertyContactInfo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/App";
import { Coins } from "lucide-react";
import { db } from "@/lib/database";

interface PropertySidebarProps {
  price: number;
  status: string;
  isLoggedIn: boolean;
  onScheduleClick: () => void;
  agentInfo?: {
    name?: string;
    company?: string;
  };
}

export function PropertySidebar({ 
  price, 
  status, 
  isLoggedIn, 
  onScheduleClick,
  agentInfo 
}: PropertySidebarProps) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tokens, setTokens] = useState<number | null>(null);
  
  const fetchUserTokens = async () => {
    if (user) {
      try {
        const userData = await db.getUserById(user.id);
        if (userData) {
          setTokens(userData.tokens);
        }
      } catch (error) {
        console.error("Error fetching user tokens:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchUserTokens();
    
    // Set up an interval to refresh tokens every 60 seconds
    const intervalId = setInterval(() => {
      fetchUserTokens();
    }, 60000);
    
    // Refresh tokens when window gets focus
    const handleFocus = () => {
      fetchUserTokens();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);
  
  const handleScheduleClick = () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to schedule a viewing", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/signin?redirect=" + encodeURIComponent(window.location.pathname)),
        },
      });
      return;
    }
    
    onScheduleClick();
  };

  return (
    <div className="lg:col-span-1">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {formatCurrency(price)}
          </div>
          <div className="mb-4">
            <span className="text-gray-500">Status: </span>
            <span className="font-semibold">
              For {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          {isLoggedIn && tokens !== null && (
            <div className="flex items-center gap-2 mb-4 text-sm font-medium">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span>Your Tokens: {tokens}</span>
            </div>
          )}
          <Separator className="my-4" />
          <div className="space-y-4">
            <Button className="w-full" onClick={handleScheduleClick}>Schedule Viewing</Button>
            <Button variant="outline" className="w-full">Contact Agent</Button>
          </div>
        </CardContent>
      </Card>

      <PropertyContactInfo agentInfo={agentInfo} />
    </div>
  );
}
