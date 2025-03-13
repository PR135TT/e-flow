
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Home, TrendingUp, MessageCircle, Coins, Search } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Nigeria's Premier <span className="text-yellow-400">Real Estate</span> Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover transparent property listings, market analytics, and connect directly with agents across Nigeria.
          </p>
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-4 rounded-lg flex flex-col md:flex-row gap-3">
            <Input 
              className="flex-grow border-0 bg-white/20 text-white placeholder:text-white/70" 
              placeholder="Search by location, property type, or price..."
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Search className="mr-2 h-4 w-4" /> Search Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Home className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Comprehensive Listings</CardTitle>
                <CardDescription>Detailed property information with photos, videos, and amenities</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Market Analytics</CardTitle>
                <CardDescription>Price trends and investment potential analysis</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Interactive Maps</CardTitle>
                <CardDescription>Explore properties by location with detailed neighborhood data</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Direct Communication</CardTitle>
                <CardDescription>Connect with agents, buyers, and sellers without intermediaries</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Incentive Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Earn Rewards with Our Token System</h2>
            <p className="text-lg mb-6">
              Get rewarded for contributing property data, writing reviews, and engaging with our platform. 
              Our token system provides real value for your participation.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Coins className="mr-2 h-4 w-4" /> Learn About Tokens
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Card className="w-64 h-64 flex items-center justify-center bg-white/90 backdrop-blur-sm">
              <CardContent>
                <Coins className="h-24 w-24 text-yellow-500 mx-auto" />
                <p className="text-center mt-4 font-bold text-lg">Property Tokens</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((item) => (
                <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                        <Home className="h-12 w-12" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>Luxury Villa {item}</CardTitle>
                      <CardDescription>Lekki, Lagos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>₦45,000,000</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-3">3 Beds</span>
                        <span className="mr-3">2 Baths</span>
                        <span>1500 sqft</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Market Analytics Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Market Analytics</h2>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Property Price Trends in Lagos</h3>
            <div className="h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <TrendingUp className="h-12 w-12 text-blue-500" />
              <span className="ml-2 text-gray-500">Analytics Visualization Coming Soon</span>
            </div>
            <p className="text-gray-600 mb-4">
              Our platform provides comprehensive market analytics to help you make informed investment decisions.
              Track price trends, compare neighborhoods, and identify high-potential areas.
            </p>
            <Button>Explore Market Data</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust E Flow for reliable Nigerian real estate data
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-6">
              Sign Up Now
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">E Flow</h3>
              <p className="text-gray-400">The go-to platform for transparent real estate data in Nigeria</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Properties</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Token System</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Market Reports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Lagos, Nigeria</li>
                <li className="text-gray-400">info@eflow.com</li>
                <li className="text-gray-400">+234 123 456 7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
