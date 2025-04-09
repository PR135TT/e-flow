
import { supabase } from '../../supabase';
import { transformPropertyData } from './utils';

export async function getPropertyById(id: string) {
  try {
    console.log("Fetching property with ID:", id);
    
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
    
    if (!propertyData) {
      console.log('No property found with ID:', id);
      return null;
    }
    
    console.log("Property data from DB:", propertyData);
    
    // If there's an agent_id, try to get agent details
    let agentData = null;
    if (propertyData.agent_id) {
      const { data: agent, error: agentError } = await supabase
        .from('users')
        .select('name, company, phone, email')
        .eq('id', propertyData.agent_id)
        .maybeSingle();
        
      if (!agentError && agent) {
        agentData = agent;
        console.log("Agent data:", agentData);
      } else if (agentError) {
        console.error('Error fetching agent data:', agentError);
      }
    }
    
    // Get owner details if available
    let ownerData = null;
    if (propertyData.owner_id) {
      const { data: owner, error: ownerError } = await supabase
        .from('users')
        .select('name, phone, email')
        .eq('id', propertyData.owner_id)
        .maybeSingle();
        
      if (!ownerError && owner) {
        ownerData = owner;
        console.log("Owner data:", ownerData);
      } else if (ownerError) {
        console.error('Error fetching owner data:', ownerError);
      }
    }
    
    // Transform the property data
    const property = transformPropertyData(propertyData);
    
    // Add agent info if available
    if (agentData) {
      property.agentName = agentData.name;
      property.agentCompany = agentData.company;
      property.agentPhone = agentData.phone;
      property.agentEmail = agentData.email;
    }
    
    // Add owner info if available
    if (ownerData) {
      property.ownerName = ownerData.name;
      property.ownerPhone = ownerData.phone;
      property.ownerEmail = ownerData.email;
    }
    
    console.log("Transformed property data:", property);
    return property;
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    return null;
  }
}
