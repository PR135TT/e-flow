
import { Link } from "react-router-dom";

export const PageFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
          <Link to="/analytics" className="text-gray-400 hover:text-white mx-2">Analytics</Link>
          <Link to="/tokens" className="text-gray-400 hover:text-white mx-2">Tokens</Link>
          <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
          <Link to="/help" className="text-gray-400 hover:text-white mx-2">Help Center</Link>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
