import { supabase } from "./supabase";
import type { Database } from "./database.types";

// Database types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  type: 'agent' | 'buyer' | 'seller';
  company?: string;
  tokens: number;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  type: string;
  location: string;
  agentCount: number;
  listingCount: number;
  rating: number;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'sale' | 'rent';
  images: string[];
  ownerId?: string;
  agentId?: string;
  companyId?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertySubmission {
  id: string;
  propertyId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  tokensAwarded: number;
  createdAt: Date;
  propertyReferenceId?: string;
}

// Add the missing getPropertiesByQuery function
export const getPropertiesByQuery = async ({ limit = 10, location = '', type = '', status = '', minPrice = 0, maxPrice = 0 } = {}) => {
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
  }));
};

// Supabase database operations
export const db = {
  // User operations
  getUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
      
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      type: user.user_type,
      company: user.company,
      tokens: user.tokens,
      createdAt: new Date(user.created_at)
    } as User));
  },
  
  getUserById: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      type: data.user_type,
      company: data.company,
      tokens: data.tokens,
      createdAt: new Date(data.created_at)
    } as User;
  },
  
  getUsersByType: async (type: 'agent' | 'buyer' | 'seller') => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', type);
      
    if (error) {
      console.error('Error fetching users by type:', error);
      return [];
    }
    
    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      type: user.user_type,
      company: user.company,
      tokens: user.tokens,
      createdAt: new Date(user.created_at)
    } as User));
  },
  
  // Property operations
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
  
  // Directory data - used by the Directory page
  getDirectoryData: async (type: string, searchQuery: string = '') => {
    if (type === 'agents') {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_type', 'agent')
        .ilike(searchQuery ? 'name' : 'id', searchQuery ? `%${searchQuery}%` : '%');
        
      if (error) {
        console.error('Error fetching agents:', error);
        return [];
      }
      
      return data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        type: user.user_type,
        company: user.company,
        tokens: user.tokens,
        createdAt: new Date(user.created_at)
      }));
    } else if (type === 'companies') {
      // For demonstration, using static data since we don't have a companies table yet
      return mockCompanies;
    } else if (type === 'buyers-sellers') {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .in('user_type', ['buyer', 'seller'])
        .ilike(searchQuery ? 'name' : 'id', searchQuery ? `%${searchQuery}%` : '%');
        
      if (error) {
        console.error('Error fetching buyers/sellers:', error);
        return [];
      }
      
      return data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        type: user.user_type,
        company: user.company,
        tokens: user.tokens,
        createdAt: new Date(user.created_at)
      }));
    }
    
    return [];
  },
  
  // Token system
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
  },
  
  submitPropertyInfo: async (userId: string, propertyInfo: Partial<Property>) => {
    // First create the property
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
        is_approved: false
      })
      .select()
      .single();
      
    if (propertyError) {
      console.error('Error creating property:', propertyError);
      return null;
    }
    
    // Calculate token reward based on how complete the property data is
    let completenessScore = 0;
    let possibleFields = 0;
    
    for (const key in propertyInfo) {
      possibleFields++;
      if (propertyInfo[key as keyof Partial<Property>] !== undefined) {
        completenessScore++;
      }
    }
    
    // Base tokens (10) + bonus for complete information
    const completenessPercentage = possibleFields > 0 ? completenessScore / possibleFields : 0;
    const tokensAwarded = Math.floor(10 + (completenessPercentage * 40)); // 10-50 tokens
    
    // Create a property submission record
    const { data: submissionData, error: submissionError } = await supabase
      .from('property_submissions')
      .insert({
        property_id: newProperty.id,
        user_id: userId,
        status: 'pending', // Pending approval
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
};

// Mock companies for now
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Lagos Realty',
    type: 'Full Service Agency',
    location: 'Lagos',
    agentCount: 24,
    listingCount: 75,
    rating: 4,
    createdAt: new Date('2020-03-12')
  },
  {
    id: '2',
    name: 'Capital Properties',
    type: 'Commercial Specialists',
    location: 'Abuja',
    agentCount: 18,
    listingCount: 62,
    rating: 5,
    createdAt: new Date('2019-11-05')
  },
  {
    id: '3',
    name: 'Riverside Homes',
    type: 'Residential Agency',
    location: 'Port Harcourt',
    agentCount: 12,
    listingCount: 43,
    rating: 4,
    createdAt: new Date('2021-01-20')
  },
  {
    id: '4',
    name: 'Northern Estates',
    type: 'Property Development',
    location: 'Kano',
    agentCount: 9,
    listingCount: 31,
    rating: 3,
    createdAt: new Date('2021-09-15')
  },
  {
    id: '5',
    name: 'Western Realty',
    type: 'Residential & Commercial',
    location: 'Ibadan',
    agentCount: 15,
    listingCount: 52,
    rating: 4,
    createdAt: new Date('2020-07-10')
  }
];
