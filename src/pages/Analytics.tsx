
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowUp, ArrowDown, Home, LineChart, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">E Flow</Link>
            <nav>
              <Link to="/properties" className="text-white hover:text-yellow-400 ml-4">Properties</Link>
              <Link to="/tokens" className="text-white hover:text-yellow-400 ml-4">Tokens</Link>
              <Link to="/blog" className="text-white hover:text-yellow-400 ml-4">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Analytics Content */}
      <section className="py-12 bg-gray-50 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Real Estate Market Analytics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average Property Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">₦75,000,000</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>12.5%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Compared to last year</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Properties Sold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">283</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>8.3%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Average Time on Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">42 days</div>
                  <div className="flex items-center text-red-500">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>5.2%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Compared to last quarter</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white p-6">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                  Price Trends by Location
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-blue-500" />
                  <span className="ml-2 text-gray-500">Price Trend Visualization Coming Soon</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-6">
              <CardHeader className="px-0">
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-green-600" />
                  Property Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Home className="h-12 w-12 text-green-500" />
                  <span className="ml-2 text-gray-500">Property Distribution Visualization Coming Soon</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white p-6 mb-8">
            <CardHeader className="px-0">
              <CardTitle>Investment Potential Analysis</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neighborhood</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average ROI</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">5-Year Projection</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment Risk</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Lekki Phase 1</td>
                      <td className="px-6 py-4 whitespace-nowrap">15.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap">+28.5%</td>
                      <td className="px-6 py-4 whitespace-nowrap">Low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Ikeja GRA</td>
                      <td className="px-6 py-4 whitespace-nowrap">12.8%</td>
                      <td className="px-6 py-4 whitespace-nowrap">+22.1%</td>
                      <td className="px-6 py-4 whitespace-nowrap">Low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Ikoyi</td>
                      <td className="px-6 py-4 whitespace-nowrap">10.5%</td>
                      <td className="px-6 py-4 whitespace-nowrap">+18.7%</td>
                      <td className="px-6 py-4 whitespace-nowrap">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Victoria Island</td>
                      <td className="px-6 py-4 whitespace-nowrap">13.9%</td>
                      <td className="px-6 py-4 whitespace-nowrap">+25.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap">Low</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Yaba</td>
                      <td className="px-6 py-4 whitespace-nowrap">17.4%</td>
                      <td className="px-6 py-4 whitespace-nowrap">+32.8%</td>
                      <td className="px-6 py-4 whitespace-nowrap">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">Download Full Market Report</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} E Flow. All rights reserved.</p>
          <div className="mt-4">
            <Link to="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
            <Link to="/properties" className="text-gray-400 hover:text-white mx-2">Properties</Link>
            <Link to="/tokens" className="text-gray-400 hover:text-white mx-2">Tokens</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white mx-2">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Analytics;
