
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LazyContent } from '../lazy-content';

// Mock the intersection observer hook
vi.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: () => [{ current: null }, true]
}));

describe('LazyContent', () => {
  it('renders children when in viewport', () => {
    render(
      <LazyContent>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders placeholder when not in viewport', () => {
    // Override mock for this test to simulate not in viewport
    vi.mocked(useIntersectionObserver).mockReturnValueOnce([{ current: null }, false]);
    
    render(
      <LazyContent>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    // Check that skeleton is rendered
    expect(document.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('renders custom placeholder when provided', () => {
    // Override mock for this test to simulate not in viewport
    vi.mocked(useIntersectionObserver).mockReturnValueOnce([{ current: null }, false]);
    
    render(
      <LazyContent placeholder={<div>Custom Placeholder</div>}>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    expect(screen.getByText('Custom Placeholder')).toBeInTheDocument();
  });
});

// Helper for the vi.mocked usage
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
