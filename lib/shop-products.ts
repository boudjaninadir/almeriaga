export type ShopProductSlug = 'lisseur' | 'pack-ecouteurs';

export const SHOP_PRODUCTS: Record<
  ShopProductSlug,
  { itemKey: 'lisseur' | 'ecouteurs'; images: Array<{ src: string; labelIndex: number }> }
> = {
  lisseur: {
    itemKey: 'lisseur',
    images: [
      { src: '/images/lisseur-main.jpg', labelIndex: 0 },
      { src: '/images/lisseur-detail.jpg', labelIndex: 1 },
      { src: '/images/lisseur-ensemble.jpg', labelIndex: 2 },
    ],
  },
  'pack-ecouteurs': {
    itemKey: 'ecouteurs',
    images: [{ src: '/images/catalogue-ecouteurs.jpg', labelIndex: 0 }],
  },
};

export function isShopProductSlug(value: string): value is ShopProductSlug {
  return value === 'lisseur' || value === 'pack-ecouteurs';
}
