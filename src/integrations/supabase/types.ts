export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_ref: string
          cabin_type_id: string
          created_at: string
          cruise_id: string
          guest_details: Json | null
          guest_email: string
          guest_first_name: string
          guest_last_name: string
          guest_phone: string | null
          id: string
          num_guests: number
          special_requests: string | null
          status: string | null
          total_price_usd: number
        }
        Insert: {
          booking_ref: string
          cabin_type_id: string
          created_at?: string
          cruise_id: string
          guest_details?: Json | null
          guest_email: string
          guest_first_name: string
          guest_last_name: string
          guest_phone?: string | null
          id?: string
          num_guests?: number
          special_requests?: string | null
          status?: string | null
          total_price_usd: number
        }
        Update: {
          booking_ref?: string
          cabin_type_id?: string
          created_at?: string
          cruise_id?: string
          guest_details?: Json | null
          guest_email?: string
          guest_first_name?: string
          guest_last_name?: string
          guest_phone?: string | null
          id?: string
          num_guests?: number
          special_requests?: string | null
          status?: string | null
          total_price_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_type_id_fkey"
            columns: ["cabin_type_id"]
            isOneToOne: false
            referencedRelation: "cabin_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_cruise_id_fkey"
            columns: ["cruise_id"]
            isOneToOne: false
            referencedRelation: "cruises"
            referencedColumns: ["id"]
          },
        ]
      }
      cabin_types: {
        Row: {
          amenities: string[] | null
          available_count: number | null
          base_price_usd: number
          beds: string | null
          category: string
          created_at: string
          cruise_id: string
          deck: string | null
          description: string | null
          gallery_urls: string[] | null
          id: string
          image_url: string | null
          max_occupancy: number | null
          name: string
          original_price_usd: number | null
          size_sqft: number | null
        }
        Insert: {
          amenities?: string[] | null
          available_count?: number | null
          base_price_usd: number
          beds?: string | null
          category: string
          created_at?: string
          cruise_id: string
          deck?: string | null
          description?: string | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          max_occupancy?: number | null
          name: string
          original_price_usd?: number | null
          size_sqft?: number | null
        }
        Update: {
          amenities?: string[] | null
          available_count?: number | null
          base_price_usd?: number
          beds?: string | null
          category?: string
          created_at?: string
          cruise_id?: string
          deck?: string | null
          description?: string | null
          gallery_urls?: string[] | null
          id?: string
          image_url?: string | null
          max_occupancy?: number | null
          name?: string
          original_price_usd?: number | null
          size_sqft?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cabin_types_cruise_id_fkey"
            columns: ["cruise_id"]
            isOneToOne: false
            referencedRelation: "cruises"
            referencedColumns: ["id"]
          },
        ]
      }
      cruise_lines: {
        Row: {
          created_at: string
          description: string | null
          founded_year: number | null
          headquarters: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          founded_year?: number | null
          headquarters?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          founded_year?: number | null
          headquarters?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cruises: {
        Row: {
          arrival_port: string
          base_price_usd: number
          created_at: string
          cruise_line_id: string
          departure_date: string
          departure_port: string
          destination_id: string
          discount_percent: number | null
          duration_days: number
          gallery_urls: string[] | null
          highlights: string[] | null
          id: string
          image_url: string | null
          included: string[] | null
          is_featured: boolean | null
          itinerary: Json | null
          max_passengers: number | null
          name: string
          not_included: string[] | null
          rating: number | null
          return_date: string
          review_count: number | null
          ship_name: string
          slug: string
          status: string | null
        }
        Insert: {
          arrival_port: string
          base_price_usd: number
          created_at?: string
          cruise_line_id: string
          departure_date: string
          departure_port: string
          destination_id: string
          discount_percent?: number | null
          duration_days: number
          gallery_urls?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          included?: string[] | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_passengers?: number | null
          name: string
          not_included?: string[] | null
          rating?: number | null
          return_date: string
          review_count?: number | null
          ship_name: string
          slug: string
          status?: string | null
        }
        Update: {
          arrival_port?: string
          base_price_usd?: number
          created_at?: string
          cruise_line_id?: string
          departure_date?: string
          departure_port?: string
          destination_id?: string
          discount_percent?: number | null
          duration_days?: number
          gallery_urls?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          included?: string[] | null
          is_featured?: boolean | null
          itinerary?: Json | null
          max_passengers?: number | null
          name?: string
          not_included?: string[] | null
          rating?: number | null
          return_date?: string
          review_count?: number | null
          ship_name?: string
          slug?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cruises_cruise_line_id_fkey"
            columns: ["cruise_line_id"]
            isOneToOne: false
            referencedRelation: "cruise_lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cruises_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          region: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          region: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          region?: string
          slug?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
