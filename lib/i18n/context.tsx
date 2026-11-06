'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { localeDirection, localeHtmlLang } from '@/lib/i18n/config';
import type { Direction, Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';

type I18nValue = {
  locale: Locale;
  dict: Dictionary;
  dir: Direction;
  isRtl: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Fournit la langue et le dictionnaire aux composants client (navbar, formulaire,
 * sélecteur). Le dictionnaire vient du serveur : il est sérialisable et déjà résolu,
 * donc aucun dictionnaire n'est envoyé au navigateur en double.
 */
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const dir = localeDirection(locale);

  // `router.refresh()` met à jour les composants serveur ; on aligne aussi <html>
  // pour que le sens de lecture et la police arabe suivent immédiatement.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = localeHtmlLang(locale);
    root.dir = dir;
  }, [locale, dir]);

  const value = useMemo<I18nValue>(
    () => ({ locale, dict: dictionary, dir, isRtl: dir === 'rtl' }),
    [locale, dictionary, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n doit être utilisé dans <I18nProvider>.');
  return value;
}
