import { useState, useEffect, PropsWithChildren } from 'hono/jsx';
import HamburgerNav from './HamburgerNav'; // HamburgerNav Islandをインポート
import { Language } from '../types/common';
import { PageLangContextProvider } from '../hooks/pageLang'; // ★ 新しいProviderをインポート

type ProfileData = {
  name: string;
  title?: string;
  copyrighter: string;
};

type RootLayoutIslandProps = PropsWithChildren<{
  profile: ProfileData;
  initialLang?: Language;
}>;

const LS_LANG_KEY = 'fisherman_lang'; // localStorageのキー

export default function RootLayoutIsland({ children, profile, initialLang = 'ja' }: RootLayoutIslandProps) {
  const [lang, setLangOriginal] = useState<Language>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedLang = localStorage.getItem(LS_LANG_KEY);
      if (storedLang && (storedLang === 'ja' || storedLang === 'ne' || storedLang === 'en')) {
        // console.log('[RootLayoutIsland InitialState] Found lang in localStorage:', storedLang);
        return storedLang as Language;
      }
    }
    // console.log('[RootLayoutIsland InitialState] No lang in localStorage, using initialLang:', initialLang);
    return initialLang;
  });

  useEffect(() => {
    // console.log('[RootLayoutIsland Effect] Language is now:', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LS_LANG_KEY, lang);
      // console.log(`[RootLayoutIsland Effect] Saved lang "${lang}" to localStorage.`);
    }
  }, [lang]);

  // console.log('[RootLayoutIsland Render] Rendering with lang:', lang);

  return (
    <>
      <HamburgerNav
        profile={{ name: profile.name }}
        lang={lang}
        setLang={setLangOriginal}
      />
      <PageLangContextProvider value={{ lang }}>
        <div>{children}</div>
      </PageLangContextProvider>
      <footer class="mt-12 text-center text-gray-400 bg-gray-800 border-t border-gray-700 py-6 shadow-inner">
        <p>&copy; {new Date().getFullYear()} {profile.copyrighter || profile.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
