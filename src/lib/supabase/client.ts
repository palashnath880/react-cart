import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "../constants";

export const createClient = () =>
  createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
