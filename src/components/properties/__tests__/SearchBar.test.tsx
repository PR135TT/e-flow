
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockProps = {
    searchQuery: '',
    setSearchQuery: vi.fn(),
    handleSearch: vi.fn(),
    handleUploadProperty: vi.fn()
  };

  it('renders correctly', () => {
    render(<SearchBar {...mockProps} />);
    
    expect(screen.getByPlaceholderText(/Search by location, property type, or price/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Property/i)).toBeInTheDocument();
  });

  it('calls setSearchQuery when input changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const input = screen.getByPlaceholderText(/Search by location, property type, or price/i);
    fireEvent.change(input, { target: { value: 'lagos' } });
    
    expect(mockProps.setSearchQuery).toHaveBeenCalledWith('lagos');
  });

  it('calls handleSearch when form is submitted', () => {
    render(<SearchBar {...mockProps} />);
    
    const form = screen.getByRole('searchbox').closest('form');
    fireEvent.submit(form);
    
    expect(mockProps.handleSearch).toHaveBeenCalled();
  });

  it('calls handleUploadProperty when button is clicked', () => {
    render(<SearchBar {...mockProps} />);
    
    const button = screen.getByText(/Upload Property/i);
    fireEvent.click(button);
    
    expect(mockProps.handleUploadProperty).toHaveBeenCalled();
  });
});
