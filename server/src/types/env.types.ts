export interface NodeEnv {
  NODE_ENV: 'development' | 'production';
  PORT: string;
  // Supabase
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}
