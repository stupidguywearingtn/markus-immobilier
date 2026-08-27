-- ============================================================
--  BACK-OFFICE ANNONCES (sous-projet B)
--  Prérequis : 0001_backoffice.sql (has_role, touch_updated_at).
--  À exécuter dans Supabase → SQL Editor après le 0001.
-- ============================================================

create table if not exists public.listings (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  status        text not null default 'draft'
                  check (status in ('draft', 'published')),
  titre         text not null,
  type          text not null
                  check (type in ('garage','parking','appartement','maison','local','terrain','immeuble')),
  transaction   text not null
                  check (transaction in ('vente','location')),
  prix          integer not null,
  prix_suffixe  text,
  adresse       text,
  quartier      text,
  ville         text not null default 'Villeurbanne',
  code_postal   text not null default '69100',
  surface       numeric,
  pieces        integer,
  dpe           text check (dpe is null or dpe in ('A','B','C','D','E','F','G')),
  ges           text check (ges is null or ges in ('A','B','C','D','E','F','G')),
  description   text not null,
  atouts        text[] not null default '{}',
  photos        jsonb  not null default '[]',   -- [{ "url": string, "alt": string }]
  mise_en_avant boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz
);

create index if not exists idx_listings_status on public.listings(status);

alter table public.listings enable row level security;

-- Lecture publique : uniquement les annonces publiées.
drop policy if exists "listings public read published" on public.listings;
create policy "listings public read published"
  on public.listings for select
  using (status = 'published');

-- Admin : tout voir + tout écrire (les policies select se cumulent en OR).
drop policy if exists "listings admin all" on public.listings;
create policy "listings admin all"
  on public.listings for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists listings_touch on public.listings;
create trigger listings_touch before update on public.listings
  for each row execute function public.touch_updated_at();

-- ---------- Storage : photos d'annonces ----------
insert into storage.buckets (id, name, public)
values ('listings', 'listings', true)
on conflict (id) do nothing;

drop policy if exists "listings-bucket public read" on storage.objects;
create policy "listings-bucket public read"
  on storage.objects for select using (bucket_id = 'listings');

drop policy if exists "listings-bucket admin write" on storage.objects;
create policy "listings-bucket admin write"
  on storage.objects for insert
  with check (bucket_id = 'listings' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "listings-bucket admin update" on storage.objects;
create policy "listings-bucket admin update"
  on storage.objects for update
  using (bucket_id = 'listings' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "listings-bucket admin delete" on storage.objects;
create policy "listings-bucket admin delete"
  on storage.objects for delete
  using (bucket_id = 'listings' and public.has_role(auth.uid(), 'admin'));
