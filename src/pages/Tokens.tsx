import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Award, Star, Users, ArrowRight, Shield, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const Tokens = () => {
  const handleButtonClick = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">E Flow</Link>
            <nav>
              <Link to="/properties" className="text-white hover:text-yellow-400 ml-4">Properties</Link>
              <Link to="/analytics" className="text-white hover:text-yellow-400 ml-4">Analytics</Link>
              <Link to="/blog" className="text-white hover:text-yellow-400 ml-4">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Earn Rewards with E Flow Tokens
            </h1>
            <p className="text-xl mb-8">
              Get rewarded for contributing to our ecosystem. Earn tokens for adding property data, writing reviews, and engaging with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-black hover:bg-gray-800 text-white"
                onClick={() => handleButtonClick("Get Started with Tokens")}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="border-black text-black hover:bg-black/10"
                onClick={() => handleButtonClick("Learn More About Tokens")}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex w-1/2 justify-center">
            <div className="relative">
              <Coins className="h-48 w-48 text-black" />
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Token System Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Earn Tokens</CardTitle>
                <CardDescription>Contribute valuable real estate data, write property reviews, and engage with community content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>5 tokens for submitting property listings</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>2 tokens for verified reviews</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>1 token for helpful community engagement</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => handleButtonClick("Start Earning")}
                >
                  Start Earning
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Use Tokens</CardTitle>
                <CardDescription>Redeem your tokens for valuable real estate services and exclusive benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Access premium market analytics</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Feature your properties in search results</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Connect with verified agents</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => handleButtonClick("Redeem Tokens")}
                >
                  Redeem Tokens
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Governance</CardTitle>
                <CardDescription>Participate in platform governance and help shape E Flow's future</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Vote on new platform features</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Help shape data verification standards</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span>Participate in community forums</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => handleButtonClick("Join Governance")}
                >
                  Join Governance
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Token Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <CardTitle>Premium Access</CardTitle>
                  <CardDescription>Unlock premium features and content</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  E Flow token holders gain access to premium analytics, market reports, and exclusive property listings not available to regular users.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-yellow-500" />
                <div>
                  <CardTitle>Network Benefits</CardTitle>
                  <CardDescription>Connect with verified professionals</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use tokens to connect directly with verified real estate agents, property managers, and other industry professionals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <CardTitle>Rewards Program</CardTitle>
                  <CardDescription>Earn more as you contribute</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our tiered rewards program increases token earnings as you contribute more valuable data and engage with the platform.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <Shield className="h-8 w-8 text-yellow-500" />
                <div>
                  <CardTitle>Data Security</CardTitle>
                  <CardDescription>Enhanced security for token holders</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Token holders benefit from enhanced data security measures and verification services for their transactions and property data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning Tokens?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users already benefiting from the E Flow token ecosystem
          </p>
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-6"
            onClick={() => handleButtonClick("Sign Up for Tokens")}
          >
            Sign Up Now
          </Button>
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
            <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tokens;
