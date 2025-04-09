
import { SignUpHeader } from "@/components/auth/SignUpHeader";
import { SignUpFooter } from "@/components/auth/SignUpFooter";
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/App";
import { toast } from "sonner";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  // Get the return path from URL query params or default to home
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/';
  
  // Check if user is already logged in and redirect if needed
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        toast.info("You're already signed in");
        navigate(returnTo !== '/' ? returnTo : '/');
      }
    };
    
    checkSession();
  }, [navigate, returnTo]);
  
  // If user becomes authenticated during the session, redirect them
  useEffect(() => {
    if (user) {
      toast.info("You're already signed in");
      navigate(returnTo !== '/' ? returnTo : '/');
    }
  }, [user, navigate, returnTo]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SignUpHeader />

      {/* Sign Up Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
          
          <div className="space-y-6 animate-fade-in">
            <p className="text-center text-gray-600 mb-4">
              Sign up with your Google account to continue
            </p>
            
            <GoogleAuthButton mode="signup" className="w-full" />
            
            <p className="text-center text-sm mt-6">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignUp;
