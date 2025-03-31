
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input and upload button', () => {
    const mockSetSearchQuery = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleUploadProperty = vi.fn();
    
    render(
      <SearchBar 
        searchQuery="" 
        setSearchQuery={mockSetSearchQuery} 
        handleSearch={mockHandleSearch}
        handleUploadProperty={mockHandleUploadProperty}
      />
    );
    
    expect(screen.getByPlaceholderText(/search by location/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/upload property/i)).toBeInTheDocument();
  });
  
  it('calls handleSearch when search button is clicked', () => {
    const mockSetSearchQuery = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleUploadProperty = vi.fn();
    
    render(
      <SearchBar 
        searchQuery="test search" 
        setSearchQuery={mockSetSearchQuery} 
        handleSearch={mockHandleSearch}
        handleUploadProperty={mockHandleUploadProperty}
      />
    );
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    
    expect(mockHandleSearch).toHaveBeenCalled();
  });
  
  it('calls setSearchQuery when input changes', () => {
    const mockSetSearchQuery = vi.fn();
    const mockHandleSearch = vi.fn();
    const mockHandleUploadProperty = vi.fn();
    
    render(
      <SearchBar 
        searchQuery="" 
        setSearchQuery={mockSetSearchQuery} 
        handleSearch={mockHandleSearch}
        handleUploadProperty={mockHandleUploadProperty}
      />
    );
    
    const searchInput = screen.getByPlaceholderText(/search by location/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test search');
  });
});
