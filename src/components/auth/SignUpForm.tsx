
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { signUpFormSchema, type SignUpFormValues } from "./SignUpFormSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { PasswordField } from "./PasswordField";
import { UserTypeSelect } from "./UserTypeSelect";
import { TermsCheckbox } from "./TermsCheckbox";
import { FormDivider } from "./FormDivider";

interface SignUpFormProps {
  returnTo?: string;
}

export const SignUpForm = ({ returnTo = '/' }: SignUpFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      location: "",
      userType: "buyer",
      company: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting first-time signup with email:", values.email);
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            phone: values.phone,
            location: values.location,
            user_type: values.userType,
            company: values.company || null,
          }
        }
      });
      
      if (authError) {
        console.error("Detailed first-time signup error:", {
          message: authError.message,
          status: authError.status,
          code: authError.code
        });
        
        switch (true) {
          case authError.message.includes("rate limit"):
            toast.error("Too many signup attempts", {
              description: "Please wait 30 minutes before trying again or contact support."
            });
            break;
          case authError.message.includes("email"):
            toast.error("Email signup issue", {
              description: "There might be a problem with your email. Please verify and try again."
            });
            break;
          default:
            toast.error("Signup failed", {
              description: authError.message || "An unexpected error occurred."
            });
        }
        
        throw authError;
      }
      
      toast.success("Signup initiated!", {
        description: "Check your email to complete registration."
      });
      
      navigate(returnTo);
    } catch (error) {
      console.error("First-time signup process error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="mb-6">
        <GoogleAuthButton mode="signup" />
        <FormDivider text="OR SIGN UP WITH EMAIL" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordField 
            form={form} 
            name="password" 
            label="Password" 
            placeholder="Create password" 
          />
          <PasswordField 
            form={form} 
            name="confirmPassword" 
            label="Confirm Password" 
            placeholder="Confirm password" 
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Your city or state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UserTypeSelect form={form} />

        <TermsCheckbox form={form} />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to={`/signin${returnTo !== '/' ? `?returnTo=${encodeURIComponent(returnTo)}` : ''}`} className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </Form>
  );
};
