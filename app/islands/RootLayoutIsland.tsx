// app/islands/RootLayoutIsland.tsx
import { useState, useEffect, PropsWithChildren } from 'hono/jsx';
import HamburgerNav from './HamburgerNav';
import { Language } from '../types/common';
import { PageLangContextProvider } from '../hooks/pageLang';

type ProfileData = { name: string; title?: string; copyrighter: string; };
type RootLayoutIslandProps = PropsWithChildren<{
  profile: ProfileData;
  initialLang?: Language;
}>;

const LS_LANG_KEY = 'fisherman_lang';
const NAVBAR_TOP_PADDING_CLASS = 'pt-[3.5rem]'; // Navbarの高さに合わせたパディング (実際の高さに合わせる)

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
  // ガラス効果のTailwindクラス（_renderer.tsxから移動してきたイメージ）
  // const glassEffectClasses = "backdrop-blur-md bg-slate-800/70 border border-slate-700/50"; // 例: 少し濃いめのガラス
  // const glassEffectClasses = "backdrop-blur-md bg-gray-900/30 border border-gray-700/50"; // 例1: ボディより少し明るい半透明ダークグレー
  // const glassEffectClasses = "backdrop-blur-md bg-black/20 border border-white/10"; // 例2: 黒の20%不透明
  const glassEffectClasses = "backdrop-blur-md bg-white/10 border border-white/20";

  return (
    <>
      <HamburgerNav
        profile={{ name: profile.name }}
        lang={lang}
        setLang={setLangOriginal}
      />

      <div class={NAVBAR_TOP_PADDING_CLASS}> {/* 固定Navbarのためのオフセット */}
        {/* ↓ このdivが魚パターンとガラス効果を持つ「カード」の役割 */}
        <div class="island-content-card relative overflow-hidden rounded-xl shadow-2xl">
          {/* 魚パターンは .island-content-card::before にCSSで設定 */}

          {/* ↓ このdivが実際のコンテンツをラップし、ガラス効果を適用 */}
          <div class={`content-on-glass relative z-[1] p-6 ${glassEffectClasses} rounded-xl`}> {/* rounded-xlで親と合わせる */}
            <PageLangContextProvider value={{ lang }}>
              <div>{children}</div>
            </PageLangContextProvider>

            {/* フッターはガラスパネルの一部として表示 */}
            <footer class="mt-12 text-center text-gray-400 py-6 border-t border-slate-600/70"> {/* 境界線の色も調整 */}
              <p>&copy; {new Date().getFullYear()} {profile.copyrighter || profile.name}. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
