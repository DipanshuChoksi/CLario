GRANT ALL ON SCHEMA next_auth TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO postgres;
GRANT ALL ON ALL ROUTINES IN SCHEMA next_auth TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO postgres;

-- Helper function for RLS
CREATE OR REPLACE FUNCTION next_auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;
