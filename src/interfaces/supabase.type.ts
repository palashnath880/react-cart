import { Database } from "./supabase";

// category type
export type Category = Database["public"]["Tables"]["categories"]["Row"];

// brand type
export type Brand = Database["public"]["Tables"]["brands"]["Row"];
