
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
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'sale' | 'rent';
  images: string[];
  ownerId: string;
  agentId?: string;
  companyId?: string;
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
}

// Mock data
const mockAgents: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@eflow.com',
    phone: '+234 123 456 7890',
    location: 'Lagos',
    type: 'agent',
    company: 'Lagos Realty',
    tokens: 450,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@eflow.com',
    phone: '+234 987 654 3210',
    location: 'Abuja',
    type: 'agent',
    company: 'Capital Properties',
    tokens: 720,
    createdAt: new Date('2023-03-20')
  },
  {
    id: '3',
    name: 'Michael Okonkwo',
    email: 'michael.o@eflow.com',
    phone: '+234 555 123 4567',
    location: 'Port Harcourt',
    type: 'agent',
    company: 'Riverside Homes',
    tokens: 380,
    createdAt: new Date('2023-05-10')
  },
  {
    id: '4',
    name: 'Fatima Ahmed',
    email: 'fatima.a@eflow.com',
    phone: '+234 777 888 9999',
    location: 'Kano',
    type: 'agent',
    company: 'Northern Estates',
    tokens: 530,
    createdAt: new Date('2023-06-05')
  },
  {
    id: '5',
    name: 'David Adeyemi',
    email: 'david.a@eflow.com',
    phone: '+234 333 444 5555',
    location: 'Ibadan',
    type: 'agent',
    company: 'Western Realty',
    tokens: 610,
    createdAt: new Date('2023-07-12')
  }
];

const mockCompanies: Company[] = [
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

const mockBuyers: User[] = [
  {
    id: '6',
    name: 'Adeola Williams',
    email: 'adeola.w@gmail.com',
    phone: '+234 111 222 3333',
    location: 'Lagos',
    type: 'buyer',
    tokens: 150,
    createdAt: new Date('2023-08-21')
  },
  {
    id: '7',
    name: 'Ibrahim Musa',
    email: 'ibrahim.m@gmail.com',
    phone: '+234 444 555 6666',
    location: 'Kaduna',
    type: 'buyer',
    tokens: 90,
    createdAt: new Date('2023-09-13')
  },
  {
    id: '8',
    name: 'Chioma Eze',
    email: 'chioma.e@gmail.com',
    phone: '+234 777 888 9999',
    location: 'Enugu',
    type: 'buyer',
    tokens: 120,
    createdAt: new Date('2023-10-05')
  }
];

const mockSellers: User[] = [
  {
    id: '9',
    name: 'Mohammed Ali',
    email: 'mohammed.a@gmail.com',
    phone: '+234 222 333 4444',
    location: 'Jos',
    type: 'seller',
    tokens: 280,
    createdAt: new Date('2023-07-17')
  },
  {
    id: '10',
    name: 'Grace Okafor',
    email: 'grace.o@gmail.com',
    phone: '+234 555 666 7777',
    location: 'Owerri',
    type: 'seller',
    tokens: 320,
    createdAt: new Date('2023-08-29')
  },
  {
    id: '11',
    name: 'Yusuf Ibrahim',
    email: 'yusuf.i@gmail.com',
    phone: '+234 888 999 0000',
    location: 'Sokoto',
    type: 'seller',
    tokens: 190,
    createdAt: new Date('2023-09-11')
  }
];

// Mock database operations
export const db = {
  // User operations
  getUsers: () => {
    return [...mockAgents, ...mockBuyers, ...mockSellers];
  },
  
  getUserById: (id: string) => {
    return [...mockAgents, ...mockBuyers, ...mockSellers].find(user => user.id === id);
  },
  
  getUsersByType: (type: 'agent' | 'buyer' | 'seller') => {
    return [...mockAgents, ...mockBuyers, ...mockSellers].filter(user => user.type === type);
  },
  
  // Company operations
  getCompanies: () => {
    return mockCompanies;
  },
  
  getCompanyById: (id: string) => {
    return mockCompanies.find(company => company.id === id);
  },
  
  // Directory data - used by the Directory page
  getDirectoryData: (type: string, searchQuery: string = '') => {
    let data: any[] = [];
    
    if (type === 'agents') {
      data = mockAgents;
    } else if (type === 'companies') {
      data = mockCompanies;
    } else if (type === 'buyers-sellers') {
      data = [...mockBuyers, ...mockSellers];
    }
    
    // Apply search filter if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return data.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.location.toLowerCase().includes(query) ||
        ('company' in item && item.company?.toLowerCase().includes(query))
      );
    }
    
    return data;
  },
  
  // Token system
  incrementUserTokens: (userId: string, tokensToAdd: number) => {
    const allUsers = [...mockAgents, ...mockBuyers, ...mockSellers];
    const user = allUsers.find(u => u.id === userId);
    
    if (user) {
      user.tokens += tokensToAdd;
      return user.tokens;
    }
    
    return null;
  },
  
  submitPropertyInfo: (userId: string, propertyData: Partial<Property>) => {
    // In a real app, this would validate and store the submission
    // For now, automatically reward user with tokens for demonstration
    const tokensAwarded = Math.floor(Math.random() * 50) + 10; // Random between 10-60
    
    const submission: PropertySubmission = {
      id: `sub_${Date.now()}`,
      propertyId: `prop_${Date.now()}`,
      userId,
      status: 'approved', // Auto-approve for demo
      tokensAwarded,
      createdAt: new Date()
    };
    
    // Update user's tokens
    db.incrementUserTokens(userId, tokensAwarded);
    
    return submission;
  }
};
