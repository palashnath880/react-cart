"use server";

import { Database } from "@/interfaces/supabase";
import { createClient } from "./supabase/server";
import { Category } from "@/interfaces/supabase.type";

// get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  // create supabase client
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
