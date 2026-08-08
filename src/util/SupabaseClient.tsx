import { createClient } from "@supabase/supabase-js";

/*
    Description: This file creates and exports a Supabase client 
    to be used by AuthContext.
    Last updated: 6/5/2026
*/

// import keys from env file to create supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);