-- Create public_users table for growth tracking (separate from main auth for now)
create table if not exists public_users (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  signup_date timestamp with time zone default timezone('utc'::text, now()) not null,
  referral_source text
);

-- Create user_actions table for retention tracking
create table if not exists user_actions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public_users(id), -- or text if using hybrid IDs
  action_type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);




-- Create growth_metrics table for daily aggregate tracking
create table if not exists growth_metrics (
  id uuid default gen_random_uuid() primary key,
  date date not null default CURRENT_DATE,
  profile_visits int default 0,
  bio_link_clicks int default 0,
  daily_signups int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
