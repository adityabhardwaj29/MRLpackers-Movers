import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://fgjiztduqgoblwfwzpab.supabase.co';

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env?.REACT_APP_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
