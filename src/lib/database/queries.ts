
import { supabase } from '../supabase';

// Query-related operations
export const getPropertiesByQuery = async ({ 
  limit = 10, 
  location = '', 
  type = '', 
  status = '', 
  minPrice = 0, 
  maxPrice = 0 
} = {}) => {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
    
  if (limit) {
    query = query.limit(limit);
  }
  
  if (location) {
    query = query.ilike('location', `%${location}%`);
  }
  
  if (type) {
    query = query.eq('type', type);
  }
  
  if (status) {
    query = query.eq('status', status);
  }
  
  if (minPrice > 0) {
    query = query.gte('price', minPrice);
  }
  
  if (maxPrice > 0) {
    query = query.lte('price', maxPrice);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching properties by query:', error);
    return [];
  }
  
  // Return the properties with the same property names as expected in the database.types.ts
  return data.map(property => ({
    id: property.id,
    title: property.title,
    description: property.description,
    price: Number(property.price),
    location: property.location,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    type: property.type,
    status: property.status,
    images: property.images || [],
    owner_id: property.owner_id,
    agent_id: property.agent_id,
    company_id: property.company_id,
    is_approved: property.is_approved,
    created_at: property.created_at,
    updated_at: property.updated_at
  }));
};
