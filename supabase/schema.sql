-- Manufacturing Intelligence OS
-- Phase 1: SaaS foundation
-- Apply through Supabase SQL Editor or convert into a timestamped migration locally.

create extension if not exists pgcrypto;
create extension if not exists vector;

do $$
begin
  create type public.organization_role as enum ('owner', 'admin', 'manager', 'operator', 'viewer');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'viewer',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.factories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  code text not null,
  timezone text not null default 'Asia/Dhaka',
  industry text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, code)
);

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists organization_members_user_idx
  on public.organization_members(user_id);

create index if not exists factories_organization_idx
  on public.factories(organization_id);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.factories enable row level security;
alter table public.user_profiles enable row level security;

-- Membership is the authorization source of truth. Never use editable user_metadata for authorization.
create policy "members can view their memberships"
  on public.organization_members
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "users can create their own membership"
  on public.organization_members
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "members can view their organizations"
  on public.organizations
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.organization_members m
      where m.organization_id = organizations.id
        and m.user_id = (select auth.uid())
    )
  );

create policy "members can view their factories"
  on public.factories
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.organization_members m
      where m.organization_id = factories.organization_id
        and m.user_id = (select auth.uid())
    )
  );

create policy "users can view their own profile"
  on public.user_profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "users can create their own profile"
  on public.user_profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "users can update their own profile"
  on public.user_profiles
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Phase 2 will add operational tables. Keep this schema intentionally small until the tenant boundary is proven.
