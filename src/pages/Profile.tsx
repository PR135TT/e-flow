
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/App";
import { Shell } from "@/components/Shell";
import { supabase } from "@/lib/supabase";
import { User } from "@/lib/database/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon, MapPin, Phone, Mail, Building, Coins, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";

const Profile = () => {
  const { user, session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (!user) {
      toast.error("You need to be signed in to view your profile");
      navigate("/signin");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const { data: profile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setUserProfile({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          type: profile.user_type,
          company: profile.company,
          tokens: profile.tokens,
          createdAt: new Date(profile.created_at)
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  if (isLoading) {
    return (
      <Shell>
        <div className="container mx-auto py-12">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse text-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto"></div>
              <div className="h-6 bg-gray-200 w-48 mx-auto mt-6 rounded"></div>
              <div className="h-4 bg-gray-200 w-32 mx-auto mt-4 rounded"></div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">User Profile</h1>

        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden border-2">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 h-24"></div>
            
            <div className="flex justify-between items-start px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-10 sm:-mt-12 gap-4">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white bg-blue-100 shadow-lg">
                  <AvatarFallback className="text-2xl font-bold text-blue-700">
                    {userProfile?.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">{userProfile?.name}</h2>
                  <Badge variant={userProfile?.type === "agent" ? "default" : userProfile?.type === "seller" ? "secondary" : "outline"}>
                    {userProfile?.type?.toUpperCase()}
                  </Badge>
                  {isAdmin && (
                    <Badge variant="destructive" className="ml-2">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      ADMIN
                    </Badge>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 mt-4">
                <Badge variant="outline" className="bg-blue-50">
                  <Coins className="h-3 w-3 mr-1 text-yellow-500" />
                  {userProfile?.tokens || 0} tokens
                </Badge>
              </div>
            </div>

            <CardContent className="mt-6">
              <CardHeader className="-ml-4 -mt-4">
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm">{userProfile?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-sm">{userProfile?.phone}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-sm">{userProfile?.location}</p>
                    </div>
                  </div>
                  
                  {userProfile?.company && (
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Building className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Company</p>
                        <p className="text-sm">{userProfile?.company}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="sm:hidden flex justify-center mt-4">
                  <Badge variant="outline" className="bg-blue-50">
                    <Coins className="h-3 w-3 mr-1 text-yellow-500" />
                    {userProfile?.tokens || 0} tokens
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="text-sm">
                      {userProfile?.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Profile;
