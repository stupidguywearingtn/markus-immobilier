-- ============================================================
--  ÉDITEUR DE PAGES (sections glisser-déposer) — sous-projet D
--  Prérequis : 0001_backoffice.sql (has_role, touch_updated_at, bucket site-images).
--  À exécuter dans Supabase → SQL Editor → New query. Ré-exécutable sans risque.
--
--  Trois tables, trois niveaux d'accès :
--    site_pages          → la version EN LIGNE. Lecture publique (le site la lit).
--    site_page_drafts    → le brouillon en cours. Admin uniquement : un visiteur
--                          ne doit jamais voir un travail non publié.
--    site_page_versions  → une ligne par publication. Admin uniquement. Sert au
--                          bouton « Historique » (retour arrière en un clic).
-- ============================================================

create table if not exists public.site_pages (
  id            uuid primary key default gen_random_uuid(),
  site_id       uuid not null,
  slug          text not null,              -- '' = page d'accueil
  titre         text not null,
  -- Contenu publié (format Puck : { root, content, zones }). null = jamais publiée.
  published     jsonb,
  published_at  timestamptz,
  -- false = page retirée du site (hors accueil) sans perdre son contenu.
  en_ligne      boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (site_id, slug)
);

create table if not exists public.site_page_drafts (
  page_id     uuid primary key references public.site_pages(id) on delete cascade,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

create table if not exists public.site_page_versions (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid not null references public.site_pages(id) on delete cascade,
  data        jsonb not null,
  created_at  timestamptz not null default now(),
  created_by  uuid references auth.users(id) on delete set null
);

create index if not exists idx_spv_page on public.site_page_versions(page_id, created_at desc);

alter table public.site_pages          enable row level security;
alter table public.site_page_drafts    enable row level security;
alter table public.site_page_versions  enable row level security;

-- ---------- site_pages : le public lit les pages publiées ----------
drop policy if exists "site_pages public read" on public.site_pages;
create policy "site_pages public read"
  on public.site_pages for select
  using (
    (published is not null and en_ligne = true)
    or public.has_role(auth.uid(), 'admin')
  );

drop policy if exists "site_pages admin all" on public.site_pages;
create policy "site_pages admin all"
  on public.site_pages for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ---------- brouillons + versions : admin seulement ----------
drop policy if exists "site_page_drafts admin all" on public.site_page_drafts;
create policy "site_page_drafts admin all"
  on public.site_page_drafts for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop policy if exists "site_page_versions admin all" on public.site_page_versions;
create policy "site_page_versions admin all"
  on public.site_page_versions for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ---------- updated_at ----------
drop trigger if exists site_pages_touch on public.site_pages;
create trigger site_pages_touch before update on public.site_pages
  for each row execute function public.touch_updated_at();

drop trigger if exists site_page_drafts_touch on public.site_page_drafts;
create trigger site_page_drafts_touch before update on public.site_page_drafts
  for each row execute function public.touch_updated_at();

-- ---------- La page d'accueil existe d'office (non publiée) ----------
-- Tant qu'elle n'est pas publiée depuis l'éditeur, le site affiche l'accueil
-- codé en dur : exécuter cette migration ne change RIEN à ce que voit le public.
insert into public.site_pages (site_id, slug, titre)
values ('11111111-1111-1111-1111-111111111111', '', 'Accueil')
on conflict (site_id, slug) do nothing;

-- Vérification : doit renvoyer 1 ligne « Accueil ».
select slug, titre, published is not null as publiee from public.site_pages;
