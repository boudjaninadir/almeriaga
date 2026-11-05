-- ============================================================
-- ALMERÍAGA — schéma Supabase (à exécuter UNE fois, SQL Editor)
-- Principe : lecture publique des produits et fournisseurs VÉRIFIÉS seulement.
-- Aucune écriture publique. Les écritures passent par l'API serveur (clé service_role).
-- ============================================================

-- 1. Produits du catalogue
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('High-Tech', 'Beauté & Soins', 'Café & Épicerie', 'Parfums', 'Accessoires')),
  price_spain_eur NUMERIC(10, 2) NOT NULL CHECK (price_spain_eur >= 0),
  est_landed_dzd NUMERIC(12, 2) NOT NULL CHECK (est_landed_dzd >= 0),
  min_qty INTEGER NOT NULL DEFAULT 1 CHECK (min_qty >= 1),
  image_url TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Fournisseurs (affichés seulement s'ils sont vérifiés)
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('Spain', 'France', 'Italy', 'Portugal')),
  city TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Outillage', 'Plomberie', 'Électricité', 'Cosmétique', 'High-Tech', 'Café & Chocolat')),
  moq_units INTEGER NOT NULL CHECK (moq_units >= 1),
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Cycles de micro-importation : PAS de données personnelles ici, écrit uniquement côté serveur.
CREATE TABLE IF NOT EXISTS public.import_cycles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_units INTEGER NOT NULL CHECK (total_units >= 1),
  purchase_price_eur NUMERIC(10, 2) NOT NULL CHECK (purchase_price_eur >= 0),
  exchange_rate_bank NUMERIC(10, 2) NOT NULL DEFAULT 151.67,
  declared_value_dzd NUMERIC(14, 2) NOT NULL,
  within_legal_limit BOOLEAN NOT NULL,
  status TEXT NOT NULL DEFAULT 'Brouillon' CHECK (status IN ('Brouillon', 'Validé Douane', 'En Transit', 'Livré')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_cycles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Produits lisibles publiquement" ON public.products;
CREATE POLICY "Produits lisibles publiquement" ON public.products
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Fournisseurs vérifiés lisibles" ON public.suppliers;
CREATE POLICY "Fournisseurs vérifiés lisibles" ON public.suppliers
  FOR SELECT TO anon, authenticated USING (verified = true);

-- Aucune politique pour import_cycles : seul le rôle service_role (serveur) y accède.
-- Aucune politique INSERT/UPDATE/DELETE pour anon/authenticated : écriture refusée par défaut.
