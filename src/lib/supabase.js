import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://swwcblmsymbwshsxqhag.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3d2NibG1zeW1id3Noc3hxaGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NzA2MjUsImV4cCI6MjEwMDU0NjYyNX0.lJJTPF_WkBSXCXC7WRZjzHY6j4r8vJoujEIJlrJakfY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
