
import { supabase } from '../supabase';
import { mockCompanies } from './types';

// Directory data operations
export const db = {
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
  }
};
