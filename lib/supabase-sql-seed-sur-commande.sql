-- ============================================================================
-- ALMERÍAGA — jeu de données « sur commande »
-- À EXÉCUTER PAR L'UTILISATEUR dans le SQL Editor de Supabase, APRÈS
-- lib/supabase-sql-products.sql. Cline n'a exécuté aucun SQL.
--
-- 12 fiches génériques issues des catégories autorisées de la matrice légale :
-- lisseur, tondeuse, sèche-cheveux, mixeur compact, bouilloire, capsules café,
-- soin visage, maquillage, écouteurs, chargeurs, montre connectée, jouets CE.
--
-- Toutes sont : status = 'sur_commande', price_dzd = NULL, is_published = false,
-- images = '{}'. Prix, photos et descriptions exactes sont à compléter par
-- l'utilisateur, puis les fiches sont publiées une par une.
-- ============================================================================

insert into public.products (slug, name, description, category, price_dzd, status, images, is_published)
values
  ('lisseur-ceramique', 'Lisseur céramique',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Beauté & soins', null, 'sur_commande', '{}', false),

  ('tondeuse-barbe', 'Tondeuse barbe',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Beauté & soins', null, 'sur_commande', '{}', false),

  ('seche-cheveux-compact', 'Sèche-cheveux compact',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Beauté & soins', null, 'sur_commande', '{}', false),

  ('mixeur-compact', 'Mixeur compact',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Électroménager compact', null, 'sur_commande', '{}', false),

  ('bouilloire-electrique', 'Bouilloire électrique',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Électroménager compact', null, 'sur_commande', '{}', false),

  ('capsules-cafe-compatibles', 'Capsules café compatibles',
   'Fiche générique sur commande. TODO : compatibilité des machines et prix en DZD à renseigner.',
   'Café', null, 'sur_commande', '{}', false),

  ('soin-visage', 'Soin visage',
   'Fiche générique sur commande. TODO : références, composition et prix en DZD à renseigner.',
   'Beauté & soins', null, 'sur_commande', '{}', false),

  ('maquillage', 'Maquillage',
   'Fiche générique sur commande. TODO : références, teintes et prix en DZD à renseigner.',
   'Maquillage', null, 'sur_commande', '{}', false),

  ('ecouteurs-sans-fil', 'Écouteurs sans fil',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Audio & charge', null, 'sur_commande', '{}', false),

  ('chargeurs-rapides', 'Chargeurs rapides',
   'Fiche générique sur commande. TODO : puissances disponibles et prix en DZD à renseigner.',
   'Audio & charge', null, 'sur_commande', '{}', false),

  ('montre-connectee', 'Montre connectée',
   'Fiche générique sur commande. TODO : modèle exact, photos et prix en DZD à renseigner.',
   'Montres & bijoux', null, 'sur_commande', '{}', false),

  ('jouets-normes-ce', 'Jouets aux normes CE',
   'Fiche générique sur commande. TODO : références, conformité CE et prix en DZD à renseigner.',
   'Jouets', null, 'sur_commande', '{}', false)
on conflict (slug) do nothing;

-- Vérification : 12 lignes, toutes non publiées et sans prix.
-- select slug, status, price_dzd, is_published from public.products order by slug;
