export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "Application for Merc": {
        Row: {
          id: string
          job_id: string | null
          status: string | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Application for Merc_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "Jobs for Merc"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Application for Merc_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users for Merc"
            referencedColumns: ["id"]
          },
        ]
      }
      "Jobs for Merc": {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          location: string | null
          requirements: Json | null
          title: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          requirements?: Json | null
          title?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          requirements?: Json | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Jobs for Merc_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Users for Merc"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          quantity: number
          status: string
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          quantity: number
          status?: string
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          quantity?: number
          status?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url: string
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          agent_id: string | null
          area: number | null
          bathrooms: number | null
          bedrooms: number | null
          company_id: string | null
          created_at: string
          description: string
          id: string
          images: string[] | null
          is_approved: boolean | null
          location: string
          owner_id: string | null
          price: number
          status: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          company_id?: string | null
          created_at?: string
          description: string
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          location: string
          owner_id?: string | null
          price: number
          status: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          company_id?: string | null
          created_at?: string
          description?: string
          id?: string
          images?: string[] | null
          is_approved?: boolean | null
          location?: string
          owner_id?: string | null
          price?: number
          status?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_submissions: {
        Row: {
          created_at: string
          id: string
          property_id: string
          property_reference_id: string | null
          status: string
          tokens_awarded: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          property_reference_id?: string | null
          status?: string
          tokens_awarded?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          property_reference_id?: string | null
          status?: string
          tokens_awarded?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_submissions_property_reference_id_fkey"
            columns: ["property_reference_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      "Resume for Merc": {
        Row: {
          id: string
          resume_uploaded_at: string | null
          resume_url: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          resume_uploaded_at?: string | null
          resume_url?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          resume_uploaded_at?: string | null
          resume_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Resume for Merc_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users for Merc"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          location: string
          name: string
          phone: string
          tokens: number
          user_type: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id: string
          location: string
          name: string
          phone: string
          tokens?: number
          user_type: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          location?: string
          name?: string
          phone?: string
          tokens?: number
          user_type?: string
        }
        Relationships: []
      }
      "Users for Merc": {
        Row: {
          created_at: string
          designation: string | null
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          designation?: string | null
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          designation?: string | null
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
