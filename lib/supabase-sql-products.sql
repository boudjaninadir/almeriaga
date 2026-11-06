-- ============================================================================
-- ALMERÍAGA — table « products »
-- À EXÉCUTER PAR L'UTILISATEUR dans le SQL Editor de Supabase.
-- Cline n'a exécuté aucun SQL.
--
-- Le script est idempotent : il crée la table si elle n'existe pas, puis ajoute
-- les colonnes manquantes (migration depuis l'ancien schéma title_fr / price_spain_eur…).
-- ============================================================================

create extension if not exists "pgcrypto";

-- Option radicale, UNIQUEMENT si l'ancienne table ne contient que des données de
-- démonstration. Décommentez la ligne suivante si vous préférez repartir de zéro.
-- drop table if exists public.products cascade;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text not null default '',
  category text not null default '',
  price_dzd integer,
  status text not null default 'sur_commande',
  images text[] not null default '{}',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- Migration : ajout des colonnes du nouveau schéma si elles manquent encore.
alter table public.products add column if not exists slug text;
alter table public.products add column if not exists name text;
alter table public.products add column if not exists description text default '';
alter table public.products add column if not exists category text default '';
alter table public.products add column if not exists price_dzd integer;
alter table public.products add column if not exists status text default 'sur_commande';
alter table public.products add column if not exists images text[] default '{}';
alter table public.products add column if not exists is_published boolean default false;
alter table public.products add column if not exists created_at timestamptz default now();

-- Valeurs par défaut pour les lignes existantes.
update public.products set description = '' where description is null;
update public.products set category = '' where category is null;
update public.products set status = 'sur_commande' where status is null;
update public.products set images = '{}' where images is null;
update public.products set is_published = false where is_published is null;
update public.products set created_at = now() where created_at is null;

-- Contraintes (ajoutées seulement si elles n'existent pas déjà).
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'products_status_check') then
    alter table public.products
      add constraint products_status_check check (status in ('disponible', 'sur_commande'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'products_price_check') then
    alter table public.products
      add constraint products_price_check check (price_dzd is null or price_dzd >= 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'products_slug_check') then
    alter table public.products
      add constraint products_slug_check check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 80);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'products_name_check') then
    alter table public.products
      add constraint products_name_check check (char_length(name) between 2 and 120);
  end if;
end $$;

-- Un slug = une seule fiche.
create unique index if not exists products_slug_key on public.products (slug);

-- ----------------------------------------------------------------------------
-- Sécurité : lecture publique des seules fiches publiées ; aucune écriture anon.
-- ----------------------------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "Produits lisibles publiquement" on public.products;
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products
  for select
  to anon, authenticated
  using (is_published = true);

revoke insert, update, delete on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;

-- ----------------------------------------------------------------------------
-- Nettoyage facultatif des anciennes colonnes (le code ne les lit plus).
-- Décommentez après vérification.
-- ----------------------------------------------------------------------------
-- alter table public.products drop column if exists title_fr;
-- alter table public.products drop column if exists title_ar;
-- alter table public.products drop column if exists price_spain_eur;
-- alter table public.products drop column if exists est_landed_dzd;
-- alter table public.products drop column if exists min_qty;
-- alter table public.products drop column if exists image_url;
-- alter table public.products drop column if exists in_stock;

