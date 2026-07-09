ALTER TABLE next_auth.accounts ADD COLUMN IF NOT EXISTS refresh_token_expires_in bigint;
