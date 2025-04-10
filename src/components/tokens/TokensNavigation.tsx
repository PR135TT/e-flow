
import { Link } from "react-router-dom";

export function TokensNavigation() {
  return (
    <section className="bg-blue-900 text-white py-3">
      <div className="container mx-auto px-4">
        <nav>
          <Link to="/properties" className="text-white hover:text-yellow-400 mr-4">Properties</Link>
          <Link to="/analytics" className="text-white hover:text-yellow-400 mr-4">Analytics</Link>
          <Link to="/blog" className="text-white hover:text-yellow-400">Blog</Link>
        </nav>
      </div>
    </section>
  );
}
