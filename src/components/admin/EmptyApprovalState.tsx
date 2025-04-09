
import { CheckCircle } from "lucide-react";

export const EmptyApprovalState = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-2">All Caught Up!</h2>
      <p className="text-gray-600">
        There are currently no properties waiting for approval.
      </p>
    </div>
  );
};
