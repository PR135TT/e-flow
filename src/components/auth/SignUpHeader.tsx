
import { Link } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";

export const SignUpHeader = () => {
  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">E Flow</Link>
          <div>
            <span className="mr-2">Already have an account?</span>
            <Link to="/signin" className="text-white font-medium underline">Sign In</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
