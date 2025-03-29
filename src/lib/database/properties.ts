import { supabase } from '../supabase';
import { Property, PropertySubmission } from './types';

// Property operations
export const db = {
  getProperties: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_approved', true);
      
    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
    
    return data.map(property => ({
      id: property.id,
      title: property.title,
      description: property.description,
      price: Number(property.price),
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area ? Number(property.area) : null,
      type: property.type,
      status: property.status,
      images: property.images || [],
      ownerId: property.owner_id,
      agentId: property.agent_id,
      companyId: property.company_id,
      isApproved: property.is_approved,
      createdAt: new Date(property.created_at),
      updatedAt: new Date(property.updated_at)
    } as Property));
  },
  
  getPropertyById: async (id: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: Number(data.price),
      location: data.location,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      area: data.area ? Number(data.area) : null,
      type: data.type,
      status: data.status,
      images: data.images || [],
      ownerId: data.owner_id,
      agentId: data.agent_id,
      companyId: data.company_id,
      isApproved: data.is_approved,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    } as Property;
  },
  
  getPropertiesByType: async (type: 'house' | 'apartment' | 'commercial' | 'land') => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('type', type)
      .eq('is_approved', true);
      
    if (error) {
      console.error('Error fetching properties by type:', error);
      return [];
    }
    
    return data.map(property => ({
      id: property.id,
      title: property.title,
      description: property.description,
      price: Number(property.price),
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area ? Number(property.area) : null,
      type: property.type,
      status: property.status,
      images: property.images || [],
      ownerId: property.owner_id,
      agentId: property.agent_id,
      companyId: property.company_id,
      isApproved: property.is_approved,
      createdAt: new Date(property.created_at),
      updatedAt: new Date(property.updated_at)
    } as Property));
  },
  
  submitPropertyInfo: async (userId: string, propertyInfo: Partial<Property>) => {
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
  },
  
  getPendingProperties: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_approved', false);
      
    if (error) {
      console.error('Error fetching pending properties:', error);
      return [];
    }
    
    return data.map(property => ({
      id: property.id,
      title: property.title,
      description: property.description,
      price: Number(property.price),
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area ? Number(property.area) : null,
      type: property.type,
      status: property.status,
      images: property.images || [],
      ownerId: property.owner_id,
      agentId: property.agent_id,
      companyId: property.company_id,
      isApproved: property.is_approved,
      createdAt: new Date(property.created_at),
      updatedAt: new Date(property.updated_at)
    } as Property));
  },
  
  approveProperty: async (propertyId: string) => {
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
    }
    
    if (submissionData) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('tokens')
        .eq('id', submissionData.user_id)
        .single();
        
      if (!userError && userData) {
        const currentTokens = userData.tokens || 0;
        const newTokens = currentTokens + submissionData.tokens_awarded;
        
        const { error: updateError } = await supabase
          .from('users')
          .update({ tokens: newTokens })
          .eq('id', submissionData.user_id);
          
        if (updateError) {
          console.error('Error updating user tokens:', updateError);
        }
      }
    }
    
    return { 
      success: true, 
      property: propertyData,
      tokensAwarded: submissionData?.tokens_awarded || 0
    };
  },
  
  rejectProperty: async (propertyId: string) => {
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
};
