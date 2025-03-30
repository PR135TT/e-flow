
import { SignInHeader } from "@/components/auth/SignInHeader";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpFooter } from "@/components/auth/SignUpFooter";
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Get the return path if it exists
  const returnTo = location.state?.returnTo || '/';
  
  // Check if user is already logged in and redirect if needed
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        toast.info("You're already signed in");
        navigate(returnTo);
      }
    };
    
    checkSession();
  }, [navigate, returnTo]);

  // If user becomes authenticated during the session, redirect them
  useEffect(() => {
    if (user) {
      toast.info("You're already signed in");
      navigate(returnTo);
    }
  }, [user, navigate, returnTo]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SignInHeader />

      {/* Sign In Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Your Account</h1>
          <SignInForm returnTo={returnTo} />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignIn;
