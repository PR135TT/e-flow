
import { supabase } from '../../supabase';

export async function rejectProperty(propertyId: string) {
  const { data: submissionData, error: submissionError } = await supabase
    .from('property_submissions')
    .update({ status: 'rejected' })
    .eq('property_id', propertyId)
    .select()
    .single();
  
  if (submissionError) {
    console.error('Error updating submission status:', submissionError);
    return { success: false, error: submissionError.message };
  }
  
  const { error: propertyError } = await supabase
    .from('properties')
    .delete()
    .eq('id', propertyId);
    
  if (propertyError) {
    console.error('Error deleting property:', propertyError);
    return { success: false, error: propertyError.message };
  }
  
  return { success: true };
}
