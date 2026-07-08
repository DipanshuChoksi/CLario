import { createClient } from '@supabase/supabase-js';
import { getEnvVariable } from '../env';
import { BaseError } from '../shared';

const supabaseUrl = getEnvVariable('SUPABASE_URL');
const supabaseServiceRoleKey = getEnvVariable('SUPABASE_SERVICE_ROLE_KEY');


if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new BaseError(
    'Supabase URL or Service Role Key not specified, create variables SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env (see .env.example)'
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
