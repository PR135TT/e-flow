
import { Separator } from "@/components/ui/separator";

interface FormDividerProps {
  text: string;
  className?: string;
}

export const FormDivider = ({ text, className = "my-6" }: FormDividerProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Separator className="flex-grow" />
      <span className="text-xs text-gray-500">{text}</span>
      <Separator className="flex-grow" />
    </div>
  );
};
