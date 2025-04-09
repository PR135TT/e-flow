
import { Property } from '../types';

// Utility function to transform database property row to Property object
export function transformPropertyData(property: any): Property {
  return {
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
  } as Property;
}
