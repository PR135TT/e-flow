
import { supabase } from '../../supabase';
import { Property } from '../types';
import { transformPropertyData } from './utils';

export async function getProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_approved', true);
    
  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
  
  return data.map(property => transformPropertyData(property));
}
