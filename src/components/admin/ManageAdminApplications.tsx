
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AdminApplication {
  id: string;
  user_id: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user_email?: string;
  user_name?: string;
}

export const ManageAdminApplications = () => {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // Get applications
      const { data: appData, error: appError } = await supabase
        .from('admin_applications')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (appError) throw appError;
      
      // Get user details for each application
      const applications = await Promise.all(
        (appData || []).map(async (app) => {
          try {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('name, email')
              .eq('id', app.user_id)
              .single();
              
            if (userError) throw userError;
            
            return {
              ...app,
              user_name: userData?.name || 'Unknown',
              user_email: userData?.email || 'Unknown'
            };
          } catch (error) {
            console.error(`Error fetching user data for ${app.user_id}:`, error);
            return {
              ...app,
              user_name: 'Unknown',
              user_email: 'Unknown'
            };
          }
        })
      );
      
      setApplications(applications);
    } catch (error) {
      console.error("Error fetching admin applications:", error);
      toast.error("Failed to load admin applications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setProcessingIds(prev => [...prev, id]);
    try {
      const { error } = await supabase
        .from('admin_applications')
        .update({ status: 'approved' })
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Application approved successfully");
      
      // Update the application status in the local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: 'approved' } : app
        )
      );
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve application");
    } finally {
      setProcessingIds(prev => prev.filter(appId => appId !== id));
    }
  };

  const handleReject = async (id: string) => {
    setProcessingIds(prev => [...prev, id]);
    try {
      const { error } = await supabase
        .from('admin_applications')
        .update({ status: 'rejected' })
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Application rejected");
      
      // Update the application status in the local state
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: 'rejected' } : app
        )
      );
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject application");
    } finally {
      setProcessingIds(prev => prev.filter(appId => appId !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Loading applications...</span>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Applications</CardTitle>
          <CardDescription>Manage applications for administrator privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">No applications available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Applications</CardTitle>
        <CardDescription>Review and manage applications for administrator privileges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div 
              key={application.id} 
              className="border rounded-lg p-4 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{application.user_name}</h3>
                  <p className="text-sm text-gray-500">{application.user_email}</p>
                  <div className="mt-1">{getStatusBadge(application.status)}</div>
                </div>
                {application.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                      onClick={() => handleApprove(application.id)}
                      disabled={processingIds.includes(application.id)}
                    >
                      {processingIds.includes(application.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                      onClick={() => handleReject(application.id)}
                      disabled={processingIds.includes(application.id)}
                    >
                      {processingIds.includes(application.id) ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}
                      Reject
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700">Reason:</h4>
                <p className="text-sm mt-1 bg-gray-50 p-2 rounded">{application.reason}</p>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Applied on: {new Date(application.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
