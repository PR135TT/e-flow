
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

interface PropertyImagesProps {
  images: string[];
}

export function PropertyImages({ images }: PropertyImagesProps) {
  if (!images || images.length === 0) {
    return (
      <div className="mb-8 rounded-lg h-[300px] md:h-[400px] bg-gray-100 flex items-center justify-center">
        <Home className="h-16 w-16 text-gray-400" />
      </div>
    );
  }

  return (
    <Card className="mb-8 overflow-hidden">
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg h-[300px] md:h-[400px] lg:h-[500px]">
                    <img 
                      src={image} 
                      alt={`Property image ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
