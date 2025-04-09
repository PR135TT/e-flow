
import { supabase } from '../supabase';
import { PropertyType } from '../database.types';

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
  
  // Transform the properties to use camelCase keys as expected by other components
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
    ownerId: property.owner_id,
    agentId: property.agent_id,
    companyId: property.company_id,
    isApproved: property.is_approved,
    createdAt: property.created_at,
    updatedAt: property.updated_at
  })) as PropertyType[];
};
