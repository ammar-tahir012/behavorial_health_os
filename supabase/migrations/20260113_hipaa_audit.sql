-- 20260113_hipaa_audit.sql
-- Purpose: Setup Audit Logging for HIPAA Compliance

-- 1. Create audit_logs table
-- This table is immutable; records should never be deleted or modified in production.
create table if not exists audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id), -- Nullable if action is pre-auth (e.g. failed login attempt via trigger)
  action text not null,
  details jsonb default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS on audit_logs (Strict!)
-- Only admins can read, NO ONE can update/delete. System can insert.
alter table audit_logs enable row level security;

create policy "Admins can view audit logs"
  on audit_logs for select
  using (
    -- Assuming a 'role' claim or specific admin table check. 
    -- For now, restricting to specific admin email or service role (service_role bypasses RLS).
    auth.jwt() ->> 'email' ilike '%@admin.com' 
  );

-- 3. Function to log changes automatically
create or replace function public.handle_audit_log()
returns trigger as $$
declare
  details_json jsonb;
begin
  details_json := jsonb_build_object(
    'table', TG_TABLE_NAME,
    'operation', TG_OP,
    'old_data', case when TG_OP = 'DELETE' or TG_OP = 'UPDATE' then row_to_json(OLD) else null end,
    'new_data', case when TG_OP = 'INSERT' or TG_OP = 'UPDATE' then row_to_json(NEW) else null end
  );

  insert into public.audit_logs (user_id, action, details)
  values (
    auth.uid(), 
    TG_OP || ' on ' || TG_TABLE_NAME,
    details_json
  );
  return new;
end;
$$ language plpgsql security definer;

-- 4. Triggers for sensitive tables (Example: public_users)
-- Repeat for any table containing PHI or sensitive info
create trigger on_public_users_change
  after insert or update or delete on public_users
  for each row execute procedure public.handle_audit_log();

-- 5. Trigger for Auth Events (Optional, requires access to auth schema which Supabase exposes)
-- Note: Supabase provides its own auth logs, but duplicating to audit_logs gives you control.
-- This part is illustrative as triggers on 'auth.users' can be tricky to manage. 
-- Ideally, use Supabase Auth Hooks or Edge Functions for auth event logging.
