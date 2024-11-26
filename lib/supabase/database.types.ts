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
      answers: {
        Row: {
          created_at: string
          id: number
          isCorrect: boolean
          question: number
          selectedAnswer: number | null
          test: number
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          isCorrect?: boolean
          question: number
          selectedAnswer?: number | null
          test: number
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          isCorrect?: boolean
          question?: number
          selectedAnswer?: number | null
          test?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_fkey"
            columns: ["question"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_test_fkey"
            columns: ["test"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          email: string | null
          firstname: string | null
          id: string
          isAdmin: boolean
          lastname: string | null
        }
        Insert: {
          email?: string | null
          firstname?: string | null
          id: string
          isAdmin?: boolean
          lastname?: string | null
        }
        Update: {
          email?: string | null
          firstname?: string | null
          id?: string
          isAdmin?: boolean
          lastname?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          answers: Json[] | null
          created_at: string
          id: number
          image: string | null
          pdfId: string | null
          subject: Database["public"]["Enums"]["subject"] | null
          title: string | null
        }
        Insert: {
          answers?: Json[] | null
          created_at?: string
          id?: number
          image?: string | null
          pdfId?: string | null
          subject?: Database["public"]["Enums"]["subject"] | null
          title?: string | null
        }
        Update: {
          answers?: Json[] | null
          created_at?: string
          id?: number
          image?: string | null
          pdfId?: string | null
          subject?: Database["public"]["Enums"]["subject"] | null
          title?: string | null
        }
        Relationships: []
      }
      tests: {
        Row: {
          created_at: string
          excludeFromStatistics: boolean
          finishedAt: string
          id: number
          practice: boolean
          subject: Database["public"]["Enums"]["subject"]
          user: string
        }
        Insert: {
          created_at?: string
          excludeFromStatistics?: boolean
          finishedAt: string
          id?: number
          practice?: boolean
          subject: Database["public"]["Enums"]["subject"]
          user: string
        }
        Update: {
          created_at?: string
          excludeFromStatistics?: boolean
          finishedAt?: string
          id?: number
          practice?: boolean
          subject?: Database["public"]["Enums"]["subject"]
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "tests_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subject: "azf" | "bzf" | "bzfe"
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
