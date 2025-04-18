
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/App";
import { UserCheck, UserX, ShieldCheck, User, Calendar, Coins } from "lucide-react";
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
import { db } from "@/lib/database";

export const AuthStatus = () => {
  const { user } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
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
  
  // Fetch tokens when component mounts and when user changes
  useEffect(() => {
    fetchUserTokens();
    
    // Set up an interval to refresh tokens every 60 seconds
    const intervalId = setInterval(() => {
      fetchUserTokens();
    }, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [user]);
  
  // Refresh tokens when window gets focus
  useEffect(() => {
    const handleFocus = () => {
      fetchUserTokens();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [user]);
  
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
                    {tokens !== null && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-blue-600">
                        <Coins className="h-3.5 w-3.5" />
                        <span>{tokens} tokens</span>
                      </div>
                    )}
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
                  
                  <Link 
                    to="/appointments"
                    className="block w-full p-2 text-sm rounded-md text-left hover:bg-gray-100 mb-1 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    My Appointments
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
