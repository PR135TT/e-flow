
import { supabase } from '../../supabase';
import { Property, PropertySubmission } from '../types';

export async function submitPropertyInfo(userId: string, propertyInfo: Partial<Property>) {
  const { data: newProperty, error: propertyError } = await supabase
    .from('properties')
    .insert({
      title: propertyInfo.title || 'Untitled Property',
      description: propertyInfo.description || 'No description provided',
      price: propertyInfo.price || 0,
      location: propertyInfo.location || 'Unknown location',
      bedrooms: propertyInfo.bedrooms || null,
      bathrooms: propertyInfo.bathrooms || null,
      area: propertyInfo.area || null,
      type: propertyInfo.type || 'house',
      status: propertyInfo.status || 'sale',
      owner_id: userId,
      is_approved: false,
      images: propertyInfo.images || []
    })
    .select()
    .single();
    
  if (propertyError) {
    console.error('Error creating property:', propertyError);
    return null;
  }
  
  let tokensAwarded = 5;
  
  if (propertyInfo.description && propertyInfo.description.length > 50) {
    tokensAwarded += 2;
  }
  
  if (propertyInfo.images && propertyInfo.images.length > 0) {
    tokensAwarded += 1;
  }
  
  const { data: submissionData, error: submissionError } = await supabase
    .from('property_submissions')
    .insert({
      property_id: newProperty.id,
      user_id: userId,
      status: 'pending',
      tokens_awarded: tokensAwarded,
      property_reference_id: newProperty.id
    })
    .select()
    .single();
    
  if (submissionError) {
    console.error('Error creating property submission:', submissionError);
    return null;
  }
  
  return {
    id: submissionData.id,
    propertyId: submissionData.property_id,
    userId: submissionData.user_id,
    status: submissionData.status,
    tokensAwarded: submissionData.tokens_awarded,
    createdAt: new Date(submissionData.created_at),
    propertyReferenceId: submissionData.property_reference_id
  } as PropertySubmission;
}
