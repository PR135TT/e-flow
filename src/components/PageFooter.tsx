
import { Link } from "react-router-dom";

export const PageFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Euron Estate</h3>
            <p className="text-gray-400">The go-to platform for transparent real estate data in Nigeria</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/properties" className="text-gray-400 hover:text-white">Properties</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white">Analytics</Link></li>
              <li><Link to="/tokens" className="text-gray-400 hover:text-white">Token System</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/analytics" className="text-gray-400 hover:text-white">Market Reports</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Lagos, Nigeria</li>
              <li className="text-gray-400">info@euronestate.com</li>
              <li className="text-gray-400">+234 123 456 7890</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Euron Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
