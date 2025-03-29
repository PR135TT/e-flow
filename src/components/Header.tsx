
import { Link } from "react-router-dom";
import { AuthStatus } from "./auth/AuthStatus";
import { useAdmin } from "@/hooks/useAdmin";
import { HelpCircle } from "lucide-react";

export const Header = () => {
  const { isAdmin } = useAdmin();

  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold">E Flow</Link>
            {isAdmin && (
              <Link to="/property-approval" className="text-gray-300 hover:text-white">
                Property Approval
              </Link>
            )}
            <Link to="/admin-application" className="text-gray-300 hover:text-white">
              Admin Application
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/help" className="text-gray-300 hover:text-white flex items-center">
              <HelpCircle className="mr-1 h-4 w-4" />
              Help
            </Link>
            <AuthStatus />
          </div>
        </div>
      </div>
    </header>
  );
};
