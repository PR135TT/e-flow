
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Building } from "lucide-react";

interface PropertyContactInfoProps {
  agentInfo?: {
    name?: string;
    company?: string;
  };
}

export function PropertyContactInfo({ agentInfo }: PropertyContactInfoProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        
        {agentInfo?.name && (
          <div className="flex items-center mb-3">
            <Building className="h-5 w-5 text-gray-400 mr-3" />
            <span>{agentInfo.name}</span>
          </div>
        )}
        
        {agentInfo?.company && (
          <div className="flex items-center mb-3">
            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
            <span>{agentInfo.company}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <span>+234 123 456 7890</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-3" />
            <span>info@eflow.com</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
