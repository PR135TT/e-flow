
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Star, Shield } from "lucide-react";

export function TokensBenefits() {
  return (
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
  );
}
