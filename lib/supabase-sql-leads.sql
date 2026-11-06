-- ============================================================================
-- ALMERÍAGA — table « leads » + vue « leads_par_produit »
-- À EXÉCUTER PAR L'UTILISATEUR dans le SQL Editor de Supabase.
-- Cline n'a exécuté aucun SQL.
--
-- Règle de sécurité : insertion publique autorisée par une politique WITH CHECK
-- stricte ; AUCUNE politique de lecture (aucun USING (true)), donc les demandes
-- ne sont lisibles que par le service_role / le SQL Editor.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  product_slug text,
  name text not null,
  phone text not null,
  wilaya text not null,
  business_name text,
  volume text,
  message text,
  utm_source text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

-- Migration éventuelle depuis une ancienne table leads.
alter table public.leads add column if not exists type text;
alter table public.leads add column if not exists product_slug text;
alter table public.leads add column if not exists name text;
alter table public.leads add column if not exists phone text;
alter table public.leads add column if not exists wilaya text;
alter table public.leads add column if not exists business_name text;
alter table public.leads add column if not exists volume text;
alter table public.leads add column if not exists message text;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists created_at timestamptz default now();

create index if not exists leads_product_slug_idx on public.leads (product_slug);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Validation structurelle au niveau de la base.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_type_check') then
    alter table public.leads
      add constraint leads_type_check check (type in ('consommateur', 'devis', 'revendeur', 'gros'));
  end if;
end $$;

-- ----------------------------------------------------------------------------
-- RLS : insertion publique encadrée, aucune lecture publique.
-- ----------------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    type in ('consommateur', 'devis', 'revendeur', 'gros')
    -- Téléphone algérien : 0 / +213 / 00213 puis 5, 6 ou 7 et 8 chiffres.
    and phone ~ '^(0|\+213|00213)[567][0-9]{8}$'
    and char_length(name) between 2 and 80
    and char_length(wilaya) between 2 and 60
    and char_length(coalesce(product_slug, '')) <= 80
    and char_length(coalesce(business_name, '')) <= 120
    and char_length(coalesce(volume, '')) <= 40
    and char_length(coalesce(message, '')) <= 1000
    and char_length(coalesce(utm_source, '')) <= 100
    and char_length(coalesce(utm_campaign, '')) <= 100
  );

-- Aucune politique SELECT : on retire aussi tout droit de lecture résiduel.
revoke select, update, delete on public.leads from anon, authenticated;
grant insert on public.leads to anon, authenticated;

-- ----------------------------------------------------------------------------
-- Vue d'agrégation : nombre de demandes par produit.
-- security_invoker = true (PostgreSQL 15+) : la RLS de `leads` s'applique,
-- donc la vue ne fuit rien vers anon. Elle reste lisible dans le SQL Editor.
-- ----------------------------------------------------------------------------
create or replace view public.leads_par_produit
with (security_invoker = true) as
select
  coalesce(nullif(product_slug, ''), '(sans produit)') as produit,
  count(*) filter (where type = 'consommateur') as demandes_consommateur,
  count(*) filter (where type = 'devis') as demandes_devis,
  count(*) filter (where type = 'gros') as demandes_gros,
  count(*) filter (where type = 'revendeur') as demandes_revendeur,
  count(*) as total_demandes,
  max(created_at) as derniere_demande
from public.leads
group by 1
order by total_demandes desc;

revoke all on public.leads_par_produit from anon, authenticated;

-- Sur PostgreSQL < 15, l'option security_invoker n'existe pas : supprimez la ligne
-- `with (security_invoker = true)` et gardez le `revoke all` ci-dessus.
