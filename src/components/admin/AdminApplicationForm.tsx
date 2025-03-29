
import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";

export const AdminApplicationForm = () => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const { user } = useContext(AuthContext);

  // Check if user has already applied
  useEffect(() => {
    const checkApplication = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('admin_applications')
          .select('status')
          .eq('user_id', user.id)
          .single();
          
        if (error && error.code !== 'PGRST116') {
          console.error("Error checking admin application:", error);
          return;
        }
        
        if (data) {
          setHasApplied(true);
          setApplicationStatus(data.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    checkApplication();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to apply for admin privileges");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for your application");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('admin_applications')
        .insert({
          user_id: user.id,
          reason: reason.trim(),
          status: 'pending'
        });
        
      if (error) {
        throw error;
      }
      
      toast.success("Your application has been submitted for review");
      setHasApplied(true);
      setApplicationStatus("pending");
      
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderApplicationStatus = () => {
    if (!applicationStatus) return null;
    
    switch (applicationStatus) {
      case 'pending':
        return (
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <p className="text-yellow-800 font-medium">Your application is pending review</p>
            <p className="text-yellow-700 text-sm mt-1">We'll notify you once it's been reviewed.</p>
          </div>
        );
      case 'approved':
        return (
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <p className="text-green-800 font-medium">Your application has been approved!</p>
            <p className="text-green-700 text-sm mt-1">You now have admin privileges.</p>
          </div>
        );
      case 'rejected':
        return (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-red-800 font-medium">Your application was not approved</p>
            <p className="text-red-700 text-sm mt-1">Please contact support for more information.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Application</CardTitle>
          <CardDescription>
            You need to sign in to apply for admin privileges.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for Administrator Privileges</CardTitle>
        <CardDescription>
          Administrators can approve or reject property submissions.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {hasApplied ? (
          renderApplicationStatus()
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Why should you be an administrator?
                </label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please explain why you should be granted administrator privileges..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </form>
        )}
      </CardContent>
      
      {!hasApplied && (
        <CardFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
