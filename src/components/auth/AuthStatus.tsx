
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/App";
import { UserCheck, UserX, ShieldCheck, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";

export const AuthStatus = () => {
  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  return (
    <div className="flex items-center">
      {user ? (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-blue-800 px-3">
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <ShieldCheck className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <UserCheck className="h-5 w-5 text-green-400" />
                  )}
                  <span className="hidden sm:inline">Signed In</span>
                  <Avatar className="h-8 w-8 border-2 border-green-400">
                    <AvatarFallback className="bg-blue-700 text-white text-xs">
                      {user.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[220px] p-2">
                  <div className="mb-2 p-2">
                    <p className="text-sm font-medium">Signed in as:</p>
                    <p className="text-xs truncate">{user.email}</p>
                    {isAdmin && (
                      <span className="inline-flex items-center mt-1 text-xs font-medium text-yellow-600">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Administrator
                      </span>
                    )}
                  </div>
                  
                  <Link 
                    to="/profile"
                    className="block w-full p-2 text-sm rounded-md text-left hover:bg-gray-100 mb-1 flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Link>
                  
                  {isAdmin && (
                    <Link 
                      to="/admin-management"
                      className="block w-full p-2 text-sm rounded-md text-left hover:bg-gray-100 mb-1"
                    >
                      Admin Management
                    </Link>
                  )}
                  
                  <Link 
                    to="/admin-application"
                    className="block w-full p-2 text-sm rounded-md text-left hover:bg-gray-100 mb-1"
                  >
                    {isAdmin ? "Admin Status" : "Apply for Admin"}
                  </Link>
                  
                  <Button 
                    variant="destructive" 
                    className="w-full mt-2" 
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Link to="/signin" className="flex items-center gap-2 text-white hover:text-gray-200">
          <UserX className="h-5 w-5 text-red-400" />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};
