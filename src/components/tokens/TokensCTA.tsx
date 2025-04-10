
import React from 'react';
import { Button } from "@/components/ui/button";

interface TokensCTAProps {
  onButtonClick: (action: string) => void;
}

export function TokensCTA({ onButtonClick }: TokensCTAProps) {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Earning Tokens?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users already benefiting from the E Flow token ecosystem
        </p>
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-6"
          onClick={() => onButtonClick("Sign Up for Tokens")}
        >
          Sign Up Now
        </Button>
      </div>
    </section>
  );
}
