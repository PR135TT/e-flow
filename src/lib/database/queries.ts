
import { supabase } from '../supabase';
import { PropertyType } from '../database.types';

export interface PropertyQueryParams {
  limit?: number;
  location?: string;
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'date_newest' | 'date_oldest';
}

// Query-related operations
export const getPropertiesByQuery = async ({ 
  limit = 10, 
  location = '', 
  type = '', 
  status = '', 
  minPrice = 0, 
  maxPrice = 0,
  bedrooms = 0,
  bathrooms = 0,
  sortBy = 'date_newest'
}: PropertyQueryParams = {}) => {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('is_approved', true);
    
  if (limit) {
    query = query.limit(limit);
  }
  
  if (location) {
    query = query.or(`location.ilike.%${location}%,title.ilike.%${location}%,description.ilike.%${location}%`);
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
  
  if (bedrooms > 0) {
    query = query.gte('bedrooms', bedrooms);
  }
  
  if (bathrooms > 0) {
    query = query.gte('bathrooms', bathrooms);
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'date_newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'date_oldest':
      query = query.order('created_at', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching properties by query:', error);
    return [];
  }
  
  // Transform the properties to match the expected PropertyType format
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
  } as unknown as PropertyType));
};
