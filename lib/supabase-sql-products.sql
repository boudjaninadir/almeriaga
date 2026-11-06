-- Table des produits pour le catalogue ALMERÍAGA (à exécuter MANUELLEMENT dans le SQL Editor Supabase).
-- Lecture publique (anon) uniquement ; l'écriture se fait depuis le tableau de bord ou avec la clé service_role (jamais côté client).

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

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Produits lisibles publiquement" ON public.products;
CREATE POLICY "Produits lisibles publiquement" ON public.products FOR SELECT TO anon, authenticated USING (true);
