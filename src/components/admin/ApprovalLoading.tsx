
import { Loader2 } from "lucide-react";

export const ApprovalLoading = () => {
  return (
    <div className="flex justify-center items-center py-12 flex-grow">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};
