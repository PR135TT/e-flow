
import { SignUpHeader } from "@/components/auth/SignUpHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignUpFooter } from "@/components/auth/SignUpFooter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in and redirect if needed
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SignUpHeader />

      {/* Sign Up Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
          <SignUpForm />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
};

export default SignUp;
