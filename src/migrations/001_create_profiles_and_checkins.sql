-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id),
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  score int not null check (score >= 0 and score <= 100),
  category_scores jsonb,
  responses jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_checkins_user on checkins(user_id);
