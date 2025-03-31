
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LazyContent } from '../lazy-content';

// Mock the intersection observer hook
vi.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: () => {
    return [{ current: null }, true]; // [ref, isIntersecting]
  }
}));

describe('LazyContent Component', () => {
  it('renders children when in viewport', () => {
    render(
      <LazyContent>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('renders placeholder when not in viewport and placeholder is provided', () => {
    // Override the hook mock for this test
    vi.mocked(require('@/hooks/use-intersection-observer').useIntersectionObserver).mockReturnValue([
      { current: null },
      false // not intersecting
    ]);
    
    render(
      <LazyContent placeholder={<div>Loading...</div>}>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
  
  it('renders nothing when not in viewport and no placeholder', () => {
    // Override the hook mock for this test
    vi.mocked(require('@/hooks/use-intersection-observer').useIntersectionObserver).mockReturnValue([
      { current: null },
      false // not intersecting
    ]);
    
    render(
      <LazyContent>
        <div>Test Content</div>
      </LazyContent>
    );
    
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
