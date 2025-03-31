
import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';  // Ensure vi is imported from vitest
import { useIntersectionObserver } from '../use-intersection-observer';

// Create a mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  callback: IntersectionObserverCallback;
  elements: Element[] = [];
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  
  disconnect() {
    this.elements = [];
  }
  
  observe(element: Element) {
    this.elements.push(element);
  }
  
  unobserve(element: Element) {
    this.elements = this.elements.filter(el => el !== element);
  }
  
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  
  // Helper method to simulate an intersection
  simulateIntersection(isIntersecting: boolean) {
    const entries = this.elements.map(element => ({
      isIntersecting,
      target: element,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
      time: Date.now()
    }));
    
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

describe('useIntersectionObserver', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;
  
  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      return new MockIntersectionObserver(callback);
    });
  });
  
  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });
  
  it('should return a ref and isIntersecting false initially', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    expect(result.current[0].current).toBe(null);
    expect(result.current[1]).toBe(false);
  });
  
  it('should update isIntersecting when element is observed and intersects', () => {
    const { result, rerender } = renderHook(() => useIntersectionObserver());
    
    // Get the mock observer
    const mockObserverInstance = (window.IntersectionObserver as unknown as vi.Mock).mock.results[0].value as MockIntersectionObserver;
    
    // Create a real DOM element
    const element = document.createElement('div');
    
    // Use Object.defineProperty to set the readonly ref.current
    Object.defineProperty(result.current[0], 'current', {
      get: () => element,
      configurable: true
    });
    
    // Call the hook's effect
    rerender();
    
    // Simulate intersection
    mockObserverInstance.simulateIntersection(true);
    
    expect(result.current[1]).toBe(true);
  });
});
