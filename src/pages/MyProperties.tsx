
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPropertiesList } from "@/components/properties/UserPropertiesList";
import { AuthContext } from "@/App";
import { Loader2 } from "lucide-react";

const MyProperties = () => {
  const { user, session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");
  const isAuthenticated = !!user;
  const isLoading = false; // We don't have a loading state in our AuthContext, so we'll use a static value

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/signin", { 
        state: { 
          returnTo: "/my-properties",
          message: "Please sign in to view your properties" 
        } 
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Shell>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
            <span>Loading...</span>
          </div>
        </div>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center min-h-[60vh] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800">Authentication Required</h2>
            <p className="mt-2 text-gray-600">Please sign in to view your properties.</p>
            <Button 
              className="mt-4 mx-auto" 
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Your Properties</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="properties">Your Properties</TabsTrigger>
            <TabsTrigger value="submissions">Submission History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="w-full">
            <UserPropertiesList userId={user.id} />
          </TabsContent>
          
          <TabsContent value="submissions" className="w-full">
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Submission History</h3>
              <p className="mt-1 text-gray-500">
                Track the status of your property submissions and token rewards.
              </p>
              <p className="text-sm text-blue-600 mt-4">
                Coming soon!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
};

export default MyProperties;
