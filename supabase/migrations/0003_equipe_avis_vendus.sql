-- ============================================================
--  BACK-OFFICE — ÉQUIPE, AVIS CLIENTS, BIENS VENDUS
--  Prérequis : 0001_backoffice.sql (has_role, touch_updated_at, bucket site-images).
--  À exécuter UNE fois dans Supabase → SQL Editor. Ré-exécutable sans risque :
--  les tables ne sont créées que si absentes, et le contenu de départ n'est
--  inséré que si la table est vide (jamais d'écrasement).
-- ============================================================

-- ---------- 1. Équipe ----------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  prenom      text not null,
  nom         text not null,
  badge       text,                       -- ex. « Fondateur » (optionnel)
  poste       text not null,
  bio         text,
  email       text,
  telephone   text,
  photo_url   text,
  position    integer not null default 0, -- ordre d'affichage
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- 2. Avis clients ----------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  auteur      text not null,
  date_avis   date not null default current_date,
  note        integer not null default 5 check (note between 1 and 5),
  texte       text not null,
  position    integer not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- 3. Biens vendus (galerie parallaxe de l'accueil) ----------
create table if not exists public.sold_items (
  id          uuid primary key default gen_random_uuid(),
  titre       text not null,              -- ex. « T3 — Décines »
  photo_url   text not null,
  feminin     boolean not null default false, -- « maison vendue » / « T3 vendu »
  position    integer not null default 0,
  visible     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- RLS : lecture publique des lignes visibles, écriture admin ----------
do $$
declare t text;
begin
  foreach t in array array['team_members', 'reviews', 'sold_items'] loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists "%s public read" on public.%I', t, t);
    execute format(
      'create policy "%s public read" on public.%I for select using (visible = true)', t, t);

    execute format('drop policy if exists "%s admin all" on public.%I', t, t);
    execute format(
      'create policy "%s admin all" on public.%I for all
         using (public.has_role(auth.uid(), ''admin''))
         with check (public.has_role(auth.uid(), ''admin''))', t, t);

    execute format('drop trigger if exists %s_touch on public.%I', t, t);
    execute format(
      'create trigger %s_touch before update on public.%I
         for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

-- ---------- Contenu de départ = ce qui est en ligne aujourd'hui ----------
-- Équipe : reprend les retouches déjà faites en édition inline (site_content_fields,
-- clés team.member_<i>_*) pour ne rien perdre de ce que le client a déjà modifié.
insert into public.team_members (prenom, nom, badge, poste, bio, email, telephone, photo_url, position)
select * from (
  select
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_prenom' limit 1), 'Tony'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_nom' limit 1), 'PISTILLI'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_label' limit 1), 'Fondateur'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_poste' limit 1), 'CEO – Agent immobilier'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_bio' limit 1),
      'Fondateur de Markus Immobilier, Tony pilote l''agence et accompagne vendeurs comme acquéreurs sur Villeurbanne et Lyon, de l''estimation à la signature.'),
    'tony.pistilli@markusimmobilier.fr',
    '06 81 78 77 40',
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_0_photo' limit 1), '/TONYPISTILLY.png'),
    0
  union all
  select
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_prenom' limit 1), 'David'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_nom' limit 1), 'PISTILLI'),
    (select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_label' limit 1),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_poste' limit 1), 'Conseiller en immobilier'),
    coalesce((select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_bio' limit 1),
      'Conseiller en immobilier, David suit chaque projet de la première visite jusqu''au rendez-vous chez le notaire, avec le sens du détail et de la réactivité.'),
    'david.pistilli@markusimmobilier.fr',
    '06 65 78 01 11',
    (select nullif(content_value, '') from public.site_content_fields where section_key = 'team' and field_key = 'member_1_photo' limit 1),
    1
) seed
where not exists (select 1 from public.team_members);

insert into public.reviews (auteur, date_avis, note, texte, position)
select * from (values
  ('Andrée P.', date '2020-05-19', 5, 'Équipe très dynamique… Connaît bien le terrain et cible parfaitement sa clientèle. Merci à Monsieur Pistilli qui s''est investi à 100 % pour la vente de mon appartement. Bravo à vous tous.', 0),
  ('Roger G.', date '2021-09-28', 5, 'Tony a mené d''une main de maître un doublé : la vente d''une maison et l''achat d''un appartement. Nous avons été suivis, accompagnés et très bien conseillés du premier jour jusqu''à la signature chez le notaire.', 1),
  ('Didier & Béatrice F.', date '2021-05-07', 5, 'Écoute, disponibilité, réactivité, et surtout un conseiller extrêmement compétent qui a traité notre dossier de bout en bout avec exemplarité. Les services de Tony Pistilli sont à la fois de qualité et différenciants. Encore merci !', 2)
) as seed(auteur, date_avis, note, texte, position)
where not exists (select 1 from public.reviews);

insert into public.sold_items (titre, photo_url, feminin, position)
select * from (values
  ('Maison 5 pièces — Meyzieu', '/vendus/maison-5-pieces-meyzieu.jpeg', true, 0),
  ('T3 — Décines', '/vendus/t3-decines.jpeg', false, 1),
  ('T4 — Bron', '/vendus/t4-bron.jpeg', false, 2),
  ('Maison 6 pièces — Jonage', '/vendus/maison-6-pieces-jonage.jpeg', true, 3),
  ('T2 — Meyzieu', '/vendus/t2-meyzieu.jpeg', false, 4),
  ('T3 — Meyzieu', '/vendus/t3-meyzieu.jpeg', false, 5),
  ('Maison 5 pièces — Vaulx-en-Velin', '/vendus/maison-5-pieces-vaulx-en-velin.jpeg', true, 6),
  ('T4 — Meyzieu', '/vendus/t4-meyzieu.jpeg', false, 7),
  ('T3 — Meyzieu', '/vendus/t3-meyzieu-2.jpeg', false, 8)
) as seed(titre, photo_url, feminin, position)
where not exists (select 1 from public.sold_items);

-- Vérification rapide (doit renvoyer 2 / 3 / 9 au premier passage) :
select
  (select count(*) from public.team_members) as equipe,
  (select count(*) from public.reviews)      as avis,
  (select count(*) from public.sold_items)   as vendus;
