
import { supabase } from '../supabase';
import { PropertyType } from '../database.types';
import { transformPropertyData } from './properties/utils';

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
  
  // Use the transformPropertyData utility to properly format properties
  return data.map(property => transformPropertyData(property));
};

// Get properties submitted by a specific user
export const getUserSubmittedProperties = async (userId: string) => {
  if (!userId) {
    console.error('User ID is required to fetch submitted properties');
    return [];
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user submitted properties:', error);
    return [];
  }

  return data.map(property => transformPropertyData(property));
};

// Update an existing property
export const updateProperty = async (propertyId: string, propertyData: Partial<PropertyType>) => {
  if (!propertyId) {
    console.error('Property ID is required to update a property');
    return null;
  }

  const { data, error } = await supabase
    .from('properties')
    .update({
      title: propertyData.title,
      description: propertyData.description,
      price: propertyData.price,
      location: propertyData.location,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
      type: propertyData.type,
      status: propertyData.status,
      images: propertyData.images,
      updated_at: new Date().toISOString()
    })
    .eq('id', propertyId)
    .select()
    .single();

  if (error) {
    console.error('Error updating property:', error);
    return null;
  }

  return transformPropertyData(data);
};
