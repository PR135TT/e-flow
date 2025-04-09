
import { supabase } from '../../supabase';
import { transformPropertyData } from './utils';

export async function getPendingProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_approved', false);
    
  if (error) {
    console.error('Error fetching pending properties:', error);
    return [];
  }
  
  return data.map(property => transformPropertyData(property));
}
