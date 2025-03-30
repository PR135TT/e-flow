
import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
  aspectRatio?: "square" | "video" | "wide" | number;
}

export function LazyImage({
  src,
  alt,
  className,
  fallbackIcon = <Home className="h-12 w-12 text-gray-400" />,
  aspectRatio,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setError(false);
    
    if (!src) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // Determine the aspect ratio class
  const aspectRatioClass = () => {
    if (!aspectRatio) return '';
    if (typeof aspectRatio === 'number') {
      return `aspect-[${aspectRatio}]`;
    }
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'video': return 'aspect-video';
      case 'wide': return 'aspect-[16/9]';
      default: return '';
    }
  };

  const containerClass = cn(
    "overflow-hidden bg-gray-100 relative",
    aspectRatioClass(),
    className
  );

  if (isLoading) {
    return (
      <div className={containerClass}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(containerClass, "flex items-center justify-center")}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn("w-full h-full object-cover", className)}
      loading="lazy"
      {...props}
    />
  );
}
