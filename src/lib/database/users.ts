
import { supabase } from '../supabase';
import { User } from './types';

// User operations
export const db = {
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
  }
};
