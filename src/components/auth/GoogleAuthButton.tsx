
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface GoogleAuthButtonProps {
  mode: "signin" | "signup";
  className?: string;
  onLoadingChange?: (loading: boolean) => void;
}

export const GoogleAuthButton = ({ 
  mode, 
  className = "", 
  onLoadingChange 
}: GoogleAuthButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        throw error;
      }
      
      // No need for toast here as the page will redirect to Google
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(error.message || `Failed to ${mode === 'signin' ? 'sign in' : 'sign up'} with Google. Please try again.`);
      setIsLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v3.2h5.59c-0.25,1.61-1.63,4.7-5.59,4.7c-3.37,0-6.12-2.79-6.12-6.23S8.63,6.54,12,6.54 c1.95,0,3.25,0.83,4,1.54l2.53-2.45C16.66,3.94,14.53,3,12,3C7.03,3,3,7.03,3,12s4.03,9,9,9c5.2,0,8.65-3.65,8.65-8.8 C20.65,11.58,21.01,11.1,21.35,11.1z" fill="#4285F4"></path>
            </g>
          </svg>
          {mode === "signin" ? "Sign in" : "Sign up"} with Google
        </>
      )}
    </Button>
  );
};
