
import { supabase } from '../../supabase';
import { transformPropertyData } from './utils';

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }
  
  return transformPropertyData(data);
}
