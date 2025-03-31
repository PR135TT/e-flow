
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../use-intersection-observer';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Helper to simulate intersection
  triggerIntersection(isIntersecting: boolean) {
    const entries = Array.from(this.elements).map(element => ({
      isIntersecting,
      target: element,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now()
    }));
    
    this.callback(entries, this);
  }
}

describe('useIntersectionObserver', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;
  
  beforeAll(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      return new MockIntersectionObserver(callback);
    });
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return ref and initial intersection state (false)', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    const [ref, isIntersecting] = result.current;
    
    expect(ref.current).toBe(null);
    expect(isIntersecting).toBe(false);
  });

  it('should update isIntersecting when intersection changes', () => {
    const { result } = renderHook(() => useIntersectionObserver());
    
    // Simulate element being observed
    const element = document.createElement('div');
    result.current[0].current = element;
    
    // Access the mock observer
    const observer = vi.mocked(window.IntersectionObserver).mock.results[0].value as MockIntersectionObserver;
    
    // Trigger intersection
    observer.triggerIntersection(true);
    expect(result.current[1]).toBe(true);
    
    // Trigger non-intersection
    observer.triggerIntersection(false);
    expect(result.current[1]).toBe(false);
  });

  afterAll(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });
});
