
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
  
  // Find the corresponding property submission for this property
  const { data: submissionData, error: submissionQueryError } = await supabase
    .from('property_submissions')
    .select('*')
    .eq('property_id', propertyId);
  
  if (submissionQueryError) {
    console.error('Error querying property submissions:', submissionQueryError);
    return { 
      success: true, 
      property: propertyData,
      error: 'Property approved but failed to find submission',
      tokensAwarded: 0
    };
  }
  
  // If no submission found, just return success with the property
  if (!submissionData || submissionData.length === 0) {
    console.log('No property submission found for property:', propertyId);
    return { 
      success: true, 
      property: propertyData,
      tokensAwarded: 0 
    };
  }
  
  // Update the first matching submission (there should ideally be only one)
  const submission = submissionData[0];
  const tokensAwarded = submission.tokens_awarded || 0;
  
  const { error: updateError } = await supabase
    .from('property_submissions')
    .update({ status: 'approved' })
    .eq('id', submission.id);
  
  if (updateError) {
    console.error('Error updating submission status:', updateError);
    return { 
      success: true, 
      property: propertyData,
      error: 'Property approved but failed to update submission status',
      tokensAwarded
    };
  }
  
  // Award tokens to the user when the property is approved
  if (submission.user_id) {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('tokens')
      .eq('id', submission.user_id)
      .single();
      
    if (!userError && userData) {
      const currentTokens = userData.tokens || 0;
      const newTokens = currentTokens + tokensAwarded;
      
      const { error: updateTokensError } = await supabase
        .from('users')
        .update({ tokens: newTokens })
        .eq('id', submission.user_id);
        
      if (updateTokensError) {
        console.error('Error updating user tokens:', updateTokensError);
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
  }
  
  return { 
    success: true, 
    property: propertyData,
    tokensAwarded
  };
}
