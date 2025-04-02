
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface UserTypeSelectProps {
  form: UseFormReturn<any>;
}

export const UserTypeSelect = ({ form }: UserTypeSelectProps) => {
  const userType = form.watch("userType");
  
  return (
    <>
      <FormField
        control={form.control}
        name="userType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>I am a</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="seller">Seller</SelectItem>
                <SelectItem value="agent">Real Estate Agent</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {userType === "agent" && (
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Your real estate company" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of your real estate company
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};
