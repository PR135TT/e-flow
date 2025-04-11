
import { z } from 'zod';

export const propertyFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  location: z.string().min(3, { message: 'Location is required' }),
  bedrooms: z.coerce.number().int().positive().optional(),
  bathrooms: z.coerce.number().positive().optional(),
  area: z.coerce.number().positive().optional(),
  type: z.enum(['house', 'apartment', 'commercial', 'land']),
  status: z.enum(['sale', 'rent']),
  images: z.any().optional(),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
