
import React from 'react';
import { Link } from "react-router-dom";

export function TokensFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
        <div className="mt-4">
          <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
          <Link to="/properties" className="text-gray-400 hover:text-white mx-2">Properties</Link>
          <Link to="/analytics" className="text-gray-400 hover:text-white mx-2">Analytics</Link>
          <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
