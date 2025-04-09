
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
        // Check if there's an error in the URL
        const params = new URLSearchParams(location.search);
        const errorParam = params.get('error');
        const errorDescriptionParam = params.get('error_description');
        
        if (errorParam) {
          throw new Error(errorDescriptionParam || errorParam);
        }

        // Get the session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data?.session) {
          toast.success('Authentication successful!');
          navigate('/');
        } else {
          // If no session found, try to exchange the code for a session
          const hashParams = new URLSearchParams(location.hash.substring(1));
          if (hashParams.has('access_token')) {
            // The hash contains the tokens from the OAuth provider
            toast.success('Authentication successful!');
            navigate('/');
          } else {
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
