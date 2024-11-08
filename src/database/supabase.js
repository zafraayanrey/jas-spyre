import { createClient } from "@supabase/supabase-js";

// Replace these with your own Supabase project URL and anon key
const supabaseUrl = "https://vqdccsdntrhupjzqcupr.supabase.co"; // Your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZGNjc2RudHJodXBqenFjdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MjA1MTYsImV4cCI6MjA0NjM5NjUxNn0.fqx4hKTgbHc_eRHubtl93vEbUaD65obdZXWyKKJBxGY"; // Your Supabase anon key

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
