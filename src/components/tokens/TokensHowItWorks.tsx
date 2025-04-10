
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Gift, Shield, ArrowRight } from "lucide-react";

interface TokensHowItWorksProps {
  onButtonClick: (action: string) => void;
}

export function TokensHowItWorks({ onButtonClick }: TokensHowItWorksProps) {
  return (
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
                onClick={() => onButtonClick("Start Earning")}
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
                onClick={() => onButtonClick("Redeem Tokens")}
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
                onClick={() => onButtonClick("Join Governance")}
              >
                Join Governance
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
