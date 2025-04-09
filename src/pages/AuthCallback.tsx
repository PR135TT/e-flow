
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Log authentication debug information
        console.log("Auth callback triggered");
        console.log("URL:", window.location.href);
        console.log("Search params:", location.search);
        console.log("Hash:", location.hash);
        
        // Check if there's an error in the URL
        const params = new URLSearchParams(location.search);
        const errorParam = params.get('error');
        const errorDescriptionParam = params.get('error_description');
        
        if (errorParam) {
          console.error("Auth error detected:", errorParam, errorDescriptionParam);
          throw new Error(errorDescriptionParam || errorParam);
        }

        // Get the session
        console.log("Fetching session from Supabase");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          throw error;
        }

        console.log("Session data:", data);

        if (data?.session) {
          console.log("Valid session found");
          toast.success('Authentication successful!');
          navigate('/');
        } else {
          console.log("No session found, checking hash parameters");
          // If no session found, try to exchange the code for a session
          const hashParams = new URLSearchParams(location.hash.substring(1));
          
          if (hashParams.has('access_token')) {
            console.log("Access token found in hash");
            // The hash contains the tokens from the OAuth provider
            toast.success('Authentication successful!');
            navigate('/');
          } else {
            console.log("No access token in hash");
            // If no session and no tokens in hash, the user might have canceled the OAuth flow
            toast.info('Sign in was not completed');
            navigate('/signin');
          }
        }
      } catch (error: any) {
        console.error('Error handling auth callback:', error);
        toast.error(error.message || 'Authentication error occurred');
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h1 className="text-xl mb-2">Finalizing authentication...</h1>
      <p className="text-gray-500">Please wait while we complete your sign-in process.</p>
    </div>
  );
};

export default AuthCallback;
