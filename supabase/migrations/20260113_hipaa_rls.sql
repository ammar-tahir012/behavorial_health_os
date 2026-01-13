-- 20260113_hipaa_rls.sql
-- Purpose: Enforce Row Level Security (RLS) for HIPAA Compliance

-- 1. Enable RLS on all sensitive tables
alter table public_users enable row level security;
alter table user_actions enable row level security;
alter table growth_metrics enable row level security;

-- 2. Policies for 'public_users' (e.g. Patient Profiles)

-- Policy: Users can view/edit their own profile
create policy "Users can view own profile"
  on public_users for select
  using ( auth.uid() = id ); -- Assuming 'id' matches auth.users.id. If not, needs mapping.
  
create policy "Users can update own profile"
  on public_users for update
  using ( auth.uid() = id );

-- Policy: Clinicians can view profiles of assigned patients
-- (Assuming a relationship table 'clinician_patients' exists, or a simple claim)
-- Example: 
-- create policy "Clinicians can view assigned patients"
--   on public_users for select
--   using ( 
--     exists (
--       select 1 from clinician_patients cp 
--       where cp.patient_id = public_users.id 
--       and cp.clinician_id = auth.uid()
--     )
--   );

-- 3. Policies for 'user_actions'
create policy "Users manage own actions"
  on user_actions for all
  using ( auth.uid() = user_id );

-- 4. Policies for 'growth_metrics' (Admin only?)
create policy "Admins view metrics"
  on growth_metrics for select
  using ( auth.jwt() ->> 'role' = 'service_role' or auth.jwt() ->> 'email' ilike '%@admin.com' );
