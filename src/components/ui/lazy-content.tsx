
import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LazyContentProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: React.ReactNode;
  delay?: number;
}

export function LazyContent({
  children,
  className,
  placeholder,
  delay = 0,
}: LazyContentProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
  });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  const defaultPlaceholder = (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : (placeholder || defaultPlaceholder)}
    </div>
  );
}
