"use server";
import { createClient } from "./supabase/server";
import { Brand } from "@/interfaces/supabase.type";

// get all categories
export const getAllBrands = async (): Promise<Brand[]> => {
  // create supabase client
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
