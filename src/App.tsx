
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { supabase } from "./lib/supabase";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import PropertyApproval from "./pages/PropertyApproval";
import Analytics from "./pages/Analytics";
import Tokens from "./pages/Tokens";
import Blog from "./pages/Blog";
import Directory from "./pages/Directory";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import SubmitProperty from "./pages/SubmitProperty";
import AdminApplication from "./pages/AdminApplication";
import AdminManagement from "./pages/AdminManagement";

export const AuthContext = createContext<{
  user: any | null;
  session: any | null;
}>({
  user: null,
  session: null,
});

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthContext.Provider value={{ user, session }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/property-approval" element={<PropertyApproval />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/submit-property" element={<SubmitProperty />} />
              <Route path="/admin-application" element={<AdminApplication />} />
              <Route path="/admin-management" element={<AdminManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
