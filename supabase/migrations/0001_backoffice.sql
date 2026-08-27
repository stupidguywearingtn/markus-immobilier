-- ============================================================
--  BACK-OFFICE ÉDITABLE — schéma minimal (sous-projet A)
--  À exécuter dans Supabase → SQL Editor → New query.
-- ============================================================

-- ---------- Rôles ----------
do $$ begin
  create type public.app_role as enum ('admin', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- SECURITY DEFINER = la fonction lit user_roles en contournant la RLS,
-- ce qui évite une récursion infinie dans les policies qui l'appellent.
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- Sans ce grant explicite, toute requête authentifiée touchant une policy
-- qui appelle has_role() échoue en "permission denied for function" (42501)
-- et isAdmin reste bloqué à false.
grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;

drop policy if exists "user_roles readable by self or admin" on public.user_roles;
create policy "user_roles readable by self or admin"
  on public.user_roles for select
  using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "admins manage roles" on public.user_roles;
create policy "admins manage roles"
  on public.user_roles for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ---------- Utilitaire updated_at ----------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ---------- Contenu éditable par champ ----------
do $$ begin
  create type public.content_type as enum ('text', 'image', 'richtext');
exception when duplicate_object then null; end $$;

create table if not exists public.site_content_fields (
  id            uuid primary key default gen_random_uuid(),
  site_id       uuid not null,
  section_key   text not null,
  field_key     text not null,
  content_type  public.content_type not null default 'text',
  content_value text,
  updated_at    timestamptz not null default now(),
  unique (site_id, section_key, field_key)
);

create index if not exists idx_scf_site on public.site_content_fields(site_id);

alter table public.site_content_fields enable row level security;

drop policy if exists "scf public read" on public.site_content_fields;
create policy "scf public read"
  on public.site_content_fields for select using (true);

drop policy if exists "scf admin write" on public.site_content_fields;
create policy "scf admin write"
  on public.site_content_fields for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists scf_touch on public.site_content_fields;
create trigger scf_touch before update on public.site_content_fields
  for each row execute function public.touch_updated_at();

-- ---------- Storage : images uploadées depuis l'éditeur ----------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site-images admin write" on storage.objects;
create policy "site-images admin write"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "site-images admin update" on storage.objects;
create policy "site-images admin update"
  on storage.objects for update
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "site-images admin delete" on storage.objects;
create policy "site-images admin delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.has_role(auth.uid(), 'admin'));
