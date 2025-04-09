
import { Database } from "../database.types";

// Re-export the Database types
export type { Database };

// Property type with extended fields
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: string;
  type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  images: string[];
  ownerId?: string;
  agentId?: string;
  companyId?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields for agent information
  agentName?: string;
  agentCompany?: string;
  agentPhone?: string;
  agentEmail?: string;
  // Additional fields for owner information
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
}

// Property Submission type
export interface PropertySubmission {
  id: string;
  propertyId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  tokensAwarded: number;
  createdAt: Date;
  propertyReferenceId?: string;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  type: string; // 'agent', 'buyer', 'seller'
  company?: string;
  tokens: number;
  createdAt: Date;
}

// Property Type options
export type PropertyType = 'house' | 'apartment' | 'commercial' | 'land';

// Property Status options
export type PropertyStatus = 'sale' | 'rent';

// Appointment status options
export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'completed';

// Admin application status options
export type AdminApplicationStatus = 'pending' | 'approved' | 'rejected';

// Mock companies data for directory
export const mockCompanies = [
  {
    id: '1',
    name: 'Real Estate Masters',
    type: 'Brokerage',
    location: 'Lagos, Nigeria',
    agentCount: 24,
    listingCount: 150,
    rating: 5
  },
  {
    id: '2',
    name: 'Prime Properties',
    type: 'Development',
    location: 'Abuja, Nigeria',
    agentCount: 18,
    listingCount: 120,
    rating: 4
  },
  {
    id: '3',
    name: 'City Homes',
    type: 'Brokerage',
    location: 'Port Harcourt, Nigeria',
    agentCount: 12,
    listingCount: 85,
    rating: 4
  },
  {
    id: '4',
    name: 'Luxury Estates',
    type: 'Investment',
    location: 'Ibadan, Nigeria',
    agentCount: 8,
    listingCount: 45,
    rating: 5
  },
  {
    id: '5',
    name: 'Urban Housing Solutions',
    type: 'Development',
    location: 'Kano, Nigeria',
    agentCount: 15,
    listingCount: 110,
    rating: 3
  }
];
