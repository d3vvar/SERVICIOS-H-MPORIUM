-- HOME MPORIUM · estructura ordenable de categorías y subcategorías
-- Ejecutar UNA SOLA VEZ en Supabase > SQL Editor, después de supabase-operaciones.sql.
-- No cambia ni elimina los servicios existentes.

create table if not exists public.catalog_structure (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('category', 'subcategory')),
  name text not null,
  parent_name text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (kind, name, parent_name)
);

create index if not exists catalog_structure_sort_idx
  on public.catalog_structure(kind, parent_name, sort_order);

grant select, insert, update, delete on public.catalog_structure to authenticated;
alter table public.catalog_structure enable row level security;

create policy "editors manage catalog structure"
on public.catalog_structure
for all
to authenticated
using ((select private.is_editor()))
with check ((select private.is_editor()));
