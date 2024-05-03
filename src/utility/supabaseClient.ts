import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_SIMPLE_REST_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_PROJECT_API_KEY as string;
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
