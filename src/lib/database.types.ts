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
      products: {
        Row: {
          id: number
          created_at: string
          title: string
          description: string | null
          price: number
          images: string[]
          shopier_url: string
          dimensions: string | null
          is_featured: boolean
          stock: number
        }
        Insert: {
          id?: number
          created_at?: string
          title: string
          description?: string | null
          price: number
          images: string[]
          shopier_url: string
          dimensions?: string | null
          is_featured?: boolean
          stock?: number
        }
        Update: {
          id?: number
          created_at?: string
          title?: string
          description?: string | null
          price?: number
          images?: string[]
          shopier_url?: string
          dimensions?: string | null
          is_featured?: boolean
          stock?: number
        }
      }
    }
  }
}
