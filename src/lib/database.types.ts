
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          location: string
          user_type: 'agent' | 'buyer' | 'seller'
          company?: string
          tokens: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          location: string
          user_type: 'agent' | 'buyer' | 'seller'
          company?: string
          tokens?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          location?: string
          user_type?: 'agent' | 'buyer' | 'seller'
          company?: string
          tokens?: number
          created_at?: string
        }
      }
      property_submissions: {
        Row: {
          id: string
          property_id: string
          user_id: string
          status: 'pending' | 'approved' | 'rejected'
          tokens_awarded: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id: string
          status?: 'pending' | 'approved' | 'rejected'
          tokens_awarded: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          tokens_awarded?: number
          created_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          location: string
          bedrooms: number | null
          bathrooms: number | null
          area: number | null
          type: 'house' | 'apartment' | 'commercial' | 'land'
          status: 'sale' | 'rent'
          images: string[]
          owner_id?: string
          agent_id?: string
          company_id?: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          location: string
          bedrooms?: number | null
          bathrooms?: number | null
          area?: number | null
          type: 'house' | 'apartment' | 'commercial' | 'land'
          status: 'sale' | 'rent'
          images?: string[]
          owner_id?: string
          agent_id?: string
          company_id?: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          location?: string
          bedrooms?: number | null
          bathrooms?: number | null
          area?: number | null
          type?: 'house' | 'apartment' | 'commercial' | 'land'
          status?: 'sale' | 'rent'
          images?: string[]
          owner_id?: string
          agent_id?: string
          company_id?: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Export the PropertyType type that's needed by Index.tsx
export type PropertyType = Database['public']['Tables']['properties']['Row'];
