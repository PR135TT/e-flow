
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
