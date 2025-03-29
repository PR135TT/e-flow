
// Re-export all database modules
import { db as userDB } from './users';
import { db as propertyDB } from './properties';
import { db as directoryDB } from './directory';
import { db as tokenDB } from './tokens';
import { supabase } from '../supabase';
import { getPropertiesByQuery } from './queries';

// Export individual modules
export * from './types';
export * from './users';
export * from './properties';
export * from './tokens';
export * from './queries';

// Export the combined database interface
export const db = {
  ...userDB,
  ...propertyDB,
  ...directoryDB,
  ...tokenDB
};

// Re-export supabase for backward compatibility
export { supabase };
