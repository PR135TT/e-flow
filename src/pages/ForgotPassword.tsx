
import { SignInHeader } from "@/components/auth/SignInHeader";
import { SignUpFooter } from "@/components/auth/SignUpFooter";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Check if user is already logged in and redirect if needed
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        toast.info("You're already signed in");
        navigate("/");
      }
    };
    
    checkSession();
  }, [navigate]);

  // If user becomes authenticated during the session, redirect them
  useEffect(() => {
    if (user) {
      toast.info("You're already signed in");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SignInHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
          <ForgotPasswordForm />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default ForgotPassword;
