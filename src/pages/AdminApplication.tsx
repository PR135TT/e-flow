
import { Header } from "@/components/Header";
import { PageFooter } from "@/components/PageFooter";
import { AdminApplicationForm } from "@/components/admin/AdminApplicationForm";

const AdminApplication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Administrator Application</h1>
          <AdminApplicationForm />
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default AdminApplication;
