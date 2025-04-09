
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthButton } from "./GoogleAuthButton";

interface SignInFormProps {
  returnTo?: string;
}

export const SignInForm = ({ returnTo = '/' }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
      
      <p className="text-center text-xs text-gray-500 mt-4">
        By signing in, you agree to our{" "}
        <Link to="/terms-of-service" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};
