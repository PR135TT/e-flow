
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PageFooter } from "@/components/PageFooter";
import { ManageAdminApplications } from "@/components/admin/ManageAdminApplications";
import { useAdmin } from "@/hooks/useAdmin";
import { AuthContext } from "@/App";
import { Loader2 } from "lucide-react";

const AdminManagement = () => {
  const { user } = useContext(AuthContext);
  const { isAdmin, isLoading } = useAdmin();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Checking admin status...</span>
        </main>
        <PageFooter />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin-application" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Management</h1>
          <ManageAdminApplications />
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default AdminManagement;
