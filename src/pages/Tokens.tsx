
import React, { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { TokensNavigation } from '@/components/tokens/TokensNavigation';
import { TokensHero } from '@/components/tokens/TokensHero';
import { TokensHowItWorks } from '@/components/tokens/TokensHowItWorks';
import { TokensBenefits } from '@/components/tokens/TokensBenefits';
import { TokensCTA } from '@/components/tokens/TokensCTA';
import { TokensFooter } from '@/components/tokens/TokensFooter';
import { Shell } from '@/components/Shell';

const Tokens = () => {
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error('Please log in to view your tokens');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('tokens')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching tokens:', error);
          toast.error('Could not retrieve token balance');
        } else {
          setUserTokens(data?.tokens || 0);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, []);

  const handleButtonClick = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <Shell hideHeader>
      {/* Header */}
      <Header />

      {/* Navigation */}
      <TokensNavigation />

      {/* Hero Section */}
      <TokensHero 
        userTokens={userTokens}
        onButtonClick={handleButtonClick}
      />

      {/* How it Works */}
      <TokensHowItWorks onButtonClick={handleButtonClick} />

      {/* Token Benefits */}
      <TokensBenefits />

      {/* CTA */}
      <TokensCTA onButtonClick={handleButtonClick} />

      {/* Footer */}
      <TokensFooter />
    </Shell>
  );
};

export default Tokens;
