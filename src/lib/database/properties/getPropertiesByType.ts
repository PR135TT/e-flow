
import { supabase } from '../../supabase';
import { transformPropertyData } from './utils';

export async function getPropertiesByType(type: 'house' | 'apartment' | 'commercial' | 'land') {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('type', type)
    .eq('is_approved', true);
    
  if (error) {
    console.error('Error fetching properties by type:', error);
    return [];
  }
  
  return data.map(property => transformPropertyData(property));
}
