
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { GoogleAuthButton } from "./GoogleAuthButton";

interface SignInFormProps {
  returnTo?: string;
}

export const SignInForm = ({ returnTo = '/' }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-center text-gray-600 mb-4">
        Sign in with your Google account to continue
      </p>
      
      <GoogleAuthButton 
        mode="signin" 
        className="w-full"
        onLoadingChange={setIsLoading}
      />
      
      <p className="text-center text-sm mt-6">
        Don't have an account?{" "}
        <Link to={`/signup${returnTo !== '/' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
