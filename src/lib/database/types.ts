
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
