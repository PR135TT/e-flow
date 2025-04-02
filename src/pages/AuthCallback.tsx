
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash
        const hash = window.location.hash;
        
        // Check for errors in the hash
        if (hash.includes('error=')) {
          const errorMessage = hash.split('&')[0].split('=')[1];
          toast.error(`Authentication error: ${decodeURIComponent(errorMessage)}`);
          navigate('/signin');
          return;
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
          // If no session found, the user might have canceled the OAuth flow
          toast.info('Sign in was not completed');
          navigate('/signin');
        }
      } catch (error: any) {
        console.error('Error handling auth callback:', error);
        toast.error(error.message || 'Authentication error occurred');
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <h1 className="text-xl mb-2">Finalizing authentication...</h1>
      <p className="text-gray-500">Please wait while we complete your sign-in process.</p>
    </div>
  );
};

export default AuthCallback;
