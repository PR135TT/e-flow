
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"`);
      console.log("Search query:", searchQuery);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleReadMore = (blogId: number) => {
    toast.info(`Reading blog post ${blogId}`);
    console.log(`Reading blog post ${blogId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Navigation */}
      <section className="bg-blue-900 text-white py-3">
        <div className="container mx-auto px-4">
          <nav>
            <Link to="/properties" className="text-white hover:text-yellow-400 mr-4">Properties</Link>
            <Link to="/analytics" className="text-white hover:text-yellow-400 mr-4">Analytics</Link>
            <Link to="/tokens" className="text-white hover:text-yellow-400">Tokens</Link>
          </nav>
        </div>
      </section>

      {/* Blog Header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">E Flow Blog</h1>
              <p className="text-lg text-gray-600">Insights and news about the Nigerian real estate market</p>
            </div>
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="flex">
                <Input 
                  className="rounded-r-none w-full md:w-64" 
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 h-60 md:h-auto bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                <span className="text-lg font-medium">Featured Article Image</span>
              </div>
              <div className="md:w-1/2">
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">April 10, 2023</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>John Doe</span>
                  </div>
                  <CardTitle className="text-2xl">The Future of Real Estate Investment in Lagos: 2023 Outlook</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Lagos continues to be the epicenter of Nigeria's real estate boom. This comprehensive analysis 
                    explores the key trends, opportunities, and challenges facing investors in 2023 and beyond.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleReadMore(1)}
                    className="flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  <span>Article Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">March {item + 10}, 2023</span>
                  </div>
                  <CardTitle>Understanding Property Rights in Nigeria</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">
                    Nigeria's property rights system can be complex. This article breaks down what you need 
                    to know about land ownership, C of O documents, and protecting your investment.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleReadMore(item + 1)}
                  >
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Stay updated with the latest real estate insights, market reports, and investment opportunities
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
              className="bg-white/20 border-0 text-white placeholder:text-white/70" 
              placeholder="Your email address"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
            <Link to="/properties" className="text-gray-400 hover:text-white mx-2">Properties</Link>
            <Link to="/analytics" className="text-gray-400 hover:text-white mx-2">Analytics</Link>
            <Link to="/tokens" className="text-gray-400 hover:text-white mx-2">Tokens</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
