-- HOME MPORIUM · módulo operativo ligero
-- Ejecutar UNA SOLA VEZ en: Supabase > SQL Editor > New query.
-- No incluye ni modifica la tabla existente `services`.

create schema if not exists private;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  location text,
  notes text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  client_id uuid not null references public.clients(id) on delete restrict,
  title text not null,
  notes text,
  valid_until date,
  status text not null default 'draft' check (status in ('draft','sent','review','approved','rejected','cancelled')),
  total_min numeric(12,2) not null default 0,
  total_max numeric(12,2) not null default 0,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  budget_id uuid not null references public.budgets(id) on delete cascade,
  service_id text,
  service_name text not null,
  quantity numeric(12,2) not null check (quantity > 0),
  unit text,
  unit_min_price numeric(12,2) not null default 0,
  unit_max_price numeric(12,2) not null default 0,
  total_min numeric(12,2) not null default 0,
  total_max numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  budget_id uuid not null unique references public.budgets(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  title text not null,
  status text not null default 'in_progress' check (status in ('in_progress','waiting_client','completed','cancelled')),
  start_date date,
  completed_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  detail text,
  entity_type text,
  entity_id uuid,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists budgets_client_id_idx on public.budgets(client_id);
create index if not exists budget_items_budget_id_idx on public.budget_items(budget_id);
create index if not exists projects_client_id_idx on public.projects(client_id);
create index if not exists activity_log_created_at_idx on public.activity_log(created_at desc);

-- Solo miembros definidos en editor_profiles pueden ver o modificar información operativa.
create or replace function private.is_editor()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.editor_profiles
    where user_id = (select auth.uid())
  );
$$;
revoke all on function private.is_editor() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_editor() to authenticated;

grant select, insert, update, delete on public.clients, public.budgets, public.budget_items, public.projects, public.activity_log to authenticated;

alter table public.clients enable row level security;
alter table public.budgets enable row level security;
alter table public.budget_items enable row level security;
alter table public.projects enable row level security;
alter table public.activity_log enable row level security;

create policy "editors manage clients" on public.clients for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
create policy "editors manage budgets" on public.budgets for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
create policy "editors manage budget items" on public.budget_items for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
create policy "editors manage projects" on public.projects for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
create policy "editors manage activity" on public.activity_log for all to authenticated using ((select private.is_editor())) with check ((select private.is_editor()));
