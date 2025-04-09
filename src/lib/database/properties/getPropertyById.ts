
import { supabase } from '../../supabase';
import { transformPropertyData } from './utils';

export async function getPropertyById(id: string) {
  try {
    // First, get the property details
    const { data: propertyData, error: propertyError } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (propertyError) {
      console.error('Error fetching property:', propertyError);
      return null;
    }
    
    // If there's an agent_id, try to get agent details
    let agentData = null;
    if (propertyData.agent_id) {
      const { data: agent, error: agentError } = await supabase
        .from('users')
        .select('name, company')
        .eq('id', propertyData.agent_id)
        .maybeSingle();
        
      if (!agentError && agent) {
        agentData = agent;
      } else if (agentError) {
        console.error('Error fetching agent data:', agentError);
      }
    }
    
    // Transform the property data
    const property = transformPropertyData(propertyData);
    
    // Add agent info if available
    if (agentData) {
      property.agentName = agentData.name;
      property.agentCompany = agentData.company;
    }
    
    return property;
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    return null;
  }
}
