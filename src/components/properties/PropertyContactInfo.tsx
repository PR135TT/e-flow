
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";

export function PropertyContactInfo() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
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
