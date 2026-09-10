import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { siteConfig } from '../content';
import type { Language, Theme } from '../types/content';

const LANGUAGE_KEY = 'portfolio-language';
const THEME_KEY = 'portfolio-theme';
const languages: Language[] = ['es', 'en'];
const themes: Theme[] = ['light', 'dark'];

function systemTheme(): Theme {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function readPreference(key: string): string | null {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function savePreference(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ }
}
function initialLanguage(): Language {
  if (typeof window === 'undefined') return siteConfig.language;
  const saved = readPreference(LANGUAGE_KEY) as Language | null;
  return saved && languages.includes(saved) ? saved : siteConfig.language;
}
function initialTheme(): Theme {
  if (typeof window === 'undefined') return siteConfig.theme === 'light' ? 'light' : 'dark';
  const saved = readPreference(THEME_KEY) as Theme | null;
  if (saved && themes.includes(saved)) return saved;
  return siteConfig.theme === 'system' ? systemTheme() : siteConfig.theme;
}

interface PreferencesValue {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
}
const PreferencesContext = createContext<PreferencesValue>({ language: siteConfig.language, theme: 'dark', setLanguage: () => {}, toggleTheme: () => {} });

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  useEffect(() => {
    document.documentElement.lang = language;
    savePreference(LANGUAGE_KEY, language);
  }, [language]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    savePreference(THEME_KEY, theme);
  }, [theme]);
  const value = useMemo(() => ({ language, theme, setLanguage: (next: Language) => setLanguageState(next), toggleTheme: () => setTheme(current => current === 'dark' ? 'light' : 'dark') }), [language, theme]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}
export const usePreferences = () => useContext(PreferencesContext);
