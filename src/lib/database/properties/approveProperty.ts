
import { supabase } from '../../supabase';

export async function approveProperty(propertyId: string) {
  const { data: propertyData, error: propertyError } = await supabase
    .from('properties')
    .update({ is_approved: true })
    .eq('id', propertyId)
    .select()
    .single();
    
  if (propertyError) {
    console.error('Error approving property:', propertyError);
    return { success: false, error: propertyError.message };
  }
  
  const { data: submissionData, error: submissionError } = await supabase
    .from('property_submissions')
    .update({ status: 'approved' })
    .eq('property_id', propertyId)
    .select()
    .single();
  
  if (submissionError) {
    console.error('Error updating submission status:', submissionError);
    return { success: false, error: submissionError.message };
  }
  
  // Award tokens to the user when the property is approved
  if (submissionData) {
    const tokensAwarded = submissionData.tokens_awarded || 0;
    
    // Update user's tokens
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('tokens')
      .eq('id', submissionData.user_id)
      .single();
      
    if (!userError && userData) {
      const currentTokens = userData.tokens || 0;
      const newTokens = currentTokens + tokensAwarded;
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ tokens: newTokens })
        .eq('id', submissionData.user_id);
        
      if (updateError) {
        console.error('Error updating user tokens:', updateError);
        return { 
          success: true, 
          property: propertyData,
          tokensAwarded,
          error: 'Property approved but failed to award tokens'
        };
      }
    } else {
      console.error('Error fetching user data:', userError);
      return { 
        success: true, 
        property: propertyData,
        tokensAwarded,
        error: 'Property approved but failed to award tokens'
      };
    }
    
    return { 
      success: true, 
      property: propertyData,
      tokensAwarded
    };
  }
  
  return { 
    success: true, 
    property: propertyData,
    tokensAwarded: 0
  };
}
