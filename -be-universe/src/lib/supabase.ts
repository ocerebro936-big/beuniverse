import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa o Supabase apenas se as variáveis estiverem presentes (para não quebrar no preview)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Tipos
export type User = {
  id: string;
  email: string;
  name: string;
  tree_coins: number;
  stage: number;
  expansions: number;
  affiliate_code: string;
  total_earnings: number;
  created_at?: string;
};

export type Purchase = {
  id: number;
  user_id: string;
  product_id: number;
  product_name: string;
  price: number;
  purchased_at: string;
};

export type AffiliateClick = {
  id: number;
  referrer_id: string;
  clicked_ip: string;
  created_at: string;
};
