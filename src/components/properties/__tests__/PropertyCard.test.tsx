
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyCard } from '../PropertyCard';
import { Property } from '@/lib/database/types';

// Mock the LazyImage component
vi.mock('@/components/ui/lazy-image', () => ({
  LazyImage: ({ alt }: { alt: string }) => <div data-testid="mock-image">{alt}</div>
}));

describe('PropertyCard', () => {
  const mockProperty: Property = {
    id: '1',
    title: 'Test Property',
    description: 'A test property description',
    price: 500000,
    location: 'Lagos',
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    type: 'Apartment',
    status: 'Available',
    images: ['image1.jpg'],
    ownerId: 'owner-1',
    agentId: null,
    companyId: null,
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const mockOnViewDetails = vi.fn();

  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('Lagos')).toBeInTheDocument();
    expect(screen.getByText('3 Beds')).toBeInTheDocument();
    expect(screen.getByText('2 Baths')).toBeInTheDocument();
    expect(screen.getByText('1500 sqft')).toBeInTheDocument();
  });

  it('shows pending badge when isPending is true', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        isPending={true} 
        onViewDetails={mockOnViewDetails} 
      />
    );
    
    expect(screen.getByText('Pending Approval')).toBeInTheDocument();
  });

  it('calls onViewDetails with property ID when View Details button is clicked', () => {
    render(<PropertyCard property={mockProperty} onViewDetails={mockOnViewDetails} />);
    
    const viewButton = screen.getByText('View Details');
    fireEvent.click(viewButton);
    
    expect(mockOnViewDetails).toHaveBeenCalledWith('1');
  });

  it('handles missing property details gracefully', () => {
    const incompleteProperty = {
      ...mockProperty,
      bedrooms: null,
      bathrooms: null,
      area: null,
      images: []
    };
    
    render(
      <PropertyCard 
        property={incompleteProperty} 
        onViewDetails={mockOnViewDetails} 
      />
    );
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
    // Check that placeholder div is rendered instead of image
    expect(document.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });
});
