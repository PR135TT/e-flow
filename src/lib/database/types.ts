
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

// Mock companies for directory data
export const mockCompanies: Company[] = [
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
