
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PasswordFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  showForgotPassword?: boolean;
  forgotPasswordLink?: React.ReactNode;
}

export const PasswordField = ({
  form,
  name,
  label,
  placeholder,
  showForgotPassword = false,
  forgotPasswordLink
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                {...field} 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
          {showForgotPassword && forgotPasswordLink}
        </FormItem>
      )}
    />
  );
};
