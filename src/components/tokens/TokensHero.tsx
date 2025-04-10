
import React from 'react';
import { Button } from "@/components/ui/button";
import { Coins, Star } from "lucide-react";

interface TokensHeroProps {
  userTokens: number | null;
  onButtonClick: (action: string) => void;
}

export function TokensHero({ userTokens, onButtonClick }: TokensHeroProps) {
  return (
    <section className="relative h-[60vh] bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Earn Rewards with E Flow Tokens
          </h1>
          <p className="text-xl mb-8">
            Get rewarded for contributing to our ecosystem. Earn tokens for adding property data, writing reviews, and engaging with our platform.
          </p>
          {userTokens !== null && (
            <div className="mb-4 text-lg font-semibold flex items-center">
              <Coins className="mr-2 h-6 w-6 text-black" />
              Your Current Balance: {userTokens} Tokens
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => onButtonClick("Get Started with Tokens")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-black/10"
              onClick={() => onButtonClick("Learn More About Tokens")}
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
  );
}
