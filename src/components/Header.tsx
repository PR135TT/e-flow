
import { Link } from "react-router-dom";
import { AuthStatus } from "./auth/AuthStatus";

export const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">E Flow</Link>
          <AuthStatus />
        </div>
      </div>
    </header>
  );
};
