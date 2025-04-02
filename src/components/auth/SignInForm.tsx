
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PasswordField } from "./PasswordField";
import { FormDivider } from "./FormDivider";

const signInFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

interface SignInFormProps {
  returnTo?: string;
}

export const SignInForm = ({ returnTo = '/' }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      toast.success("Signed in successfully!");
      navigate(returnTo);
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6 animate-fade-in"
      >
        <GoogleAuthButton mode="signin" className="mb-4" />
        
        <FormDivider text="OR" />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordField 
          form={form} 
          name="password" 
          label="Password" 
          placeholder="Password"
          showForgotPassword
          forgotPasswordLink={
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          }
        />

        <Button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600" 
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to={`/signup${returnTo !== '/' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};
