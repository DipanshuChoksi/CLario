-- Enable Row Level Security (RLS) on all next_auth tables
ALTER TABLE next_auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.verification_tokens ENABLE ROW LEVEL SECURITY;

-- No policies are created for anon or authenticated roles.
-- This means the tables are completely inaccessible to the frontend (PostgREST).
-- Only the Next.js server using the service_role key can read/write to these tables.

-- Fix the 'Function Search Path Mutable' security warning
ALTER FUNCTION next_auth.uid() SET search_path = '';
