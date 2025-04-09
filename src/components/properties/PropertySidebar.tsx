
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PropertyContactInfo } from "./PropertyContactInfo";

interface PropertySidebarProps {
  price: number;
  status: string;
  isLoggedIn: boolean;
  onScheduleClick: () => void;
}

export function PropertySidebar({ price, status, isLoggedIn, onScheduleClick }: PropertySidebarProps) {
  const navigate = useNavigate();
  
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
          <Separator className="my-4" />
          <div className="space-y-4">
            <Button className="w-full" onClick={handleScheduleClick}>Schedule Viewing</Button>
            <Button variant="outline" className="w-full">Contact Agent</Button>
          </div>
        </CardContent>
      </Card>

      <PropertyContactInfo />
    </div>
  );
}
