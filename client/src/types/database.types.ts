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
      notes: {
        Row: {
          audio: string | null
          created_at: string
          external_id: number
          id: number
          image: string | null
          sentence: string
          sentence_furigana: string
          source: Database["public"]["Enums"]["media_source"] | null
          source_id: string | null
          start_time: number | null
          translation: string | null
        }
        Insert: {
          audio?: string | null
          created_at?: string
          external_id: number
          id?: number
          image?: string | null
          sentence: string
          sentence_furigana: string
          source?: Database["public"]["Enums"]["media_source"] | null
          source_id?: string | null
          start_time?: number | null
          translation?: string | null
        }
        Update: {
          audio?: string | null
          created_at?: string
          external_id?: number
          id?: number
          image?: string | null
          sentence?: string
          sentence_furigana?: string
          source?: Database["public"]["Enums"]["media_source"] | null
          source_id?: string | null
          start_time?: number | null
          translation?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"]
          audio_field: string | null
          created_at: string
          deck_name: string
          expression_field: string | null
          id: number
          image_field: string | null
          name: string
          note_type: string
          reading_field: string | null
          translation_field: string | null
          user_id: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["action_type"]
          audio_field?: string | null
          created_at?: string
          deck_name: string
          expression_field?: string | null
          id?: number
          image_field?: string | null
          name: string
          note_type: string
          reading_field?: string | null
          translation_field?: string | null
          user_id: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"]
          audio_field?: string | null
          created_at?: string
          deck_name?: string
          expression_field?: string | null
          id?: number
          image_field?: string | null
          name?: string
          note_type?: string
          reading_field?: string | null
          translation_field?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      synonyms: {
        Row: {
          synonyms: string[] | null
          term: string
        }
        Insert: {
          synonyms?: string[] | null
          term: string
        }
        Update: {
          synonyms?: string[] | null
          term?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      search_sentences: {
        Args: {
          keyword: string
        }
        Returns: {
          id: number
          sentence: string
          len: number
          sentence_furigana: string
          translation: string
          audio: string
          image: string
          start_time: number
          source_id: string
          highlighted_sentence: string
          highlighted_language: string
          sentence_furigana_highlight: string
        }[]
      }
    }
    Enums: {
      action_type: "addNote" | "updateNote"
      media_source: "youtube"
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

