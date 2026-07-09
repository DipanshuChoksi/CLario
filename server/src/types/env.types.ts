export interface NodeEnv {
  NODE_ENV: 'development' | 'production';
  PORT: string;
  FRONTEND_URL: string;
  // Supabase
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  // Google
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}
