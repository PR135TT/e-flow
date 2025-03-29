
import { supabase } from '../supabase';

// Token system operations
export const db = {
  incrementUserTokens: async (userId: string, tokensToAdd: number) => {
    // First, get the current token count
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('tokens')
      .eq('id', userId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching user tokens:', fetchError);
      return null;
    }
    
    const newTokenAmount = (userData.tokens || 0) + tokensToAdd;
    
    // Update the token count
    const { data, error } = await supabase
      .from('users')
      .update({ tokens: newTokenAmount })
      .eq('id', userId)
      .select('tokens')
      .single();
      
    if (error) {
      console.error('Error updating user tokens:', error);
      return null;
    }
    
    return data.tokens;
  }
};
