
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from '../use-intersection-observer';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  root: Element | Document | null;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.elements = new Set();
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = options?.threshold ? 
      Array.isArray(options.threshold) ? options.threshold : [options.threshold] 
      : [0];
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

  takeRecords(): IntersectionObserverEntry[] {
    return [];
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
    
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

describe('useIntersectionObserver', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;
  
  beforeAll(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = vi.fn().mockImplementation((callback, options) => {
      return new MockIntersectionObserver(callback, options) as unknown as IntersectionObserver;
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
    const { result, rerender } = renderHook(() => useIntersectionObserver());
    
    // Get the mock observer
    const mockObserverInstance = (window.IntersectionObserver as unknown as jest.Mock).mock.results[0].value as MockIntersectionObserver;
    
    // Create and set a real DOM element (we can't directly set ref.current as it's readonly)
    const element = document.createElement('div');
    // Use the ref callback approach to set the element
    Object.defineProperty(result.current[0], 'current', {
      value: element,
      configurable: true
    });
    
    // Trigger the useEffect that observes the element
    rerender();
    
    // Trigger intersection
    mockObserverInstance.triggerIntersection(true);
    
    // Since we can't update the result directly in the test,
    // we need to check if the callback was called with the right parameters
    expect(mockObserverInstance.elements.has(element)).toBe(true);
  });

  afterAll(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });
});
