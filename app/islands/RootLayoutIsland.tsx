import { useState, useEffect, PropsWithChildren } from 'hono/jsx';
import HamburgerNav from './HamburgerNav';
import { Language } from '../types/common';
import type { ProfileData } from '../types/profile';
import type { SiteConfig } from '../types/siteConfig';
import type { RouteContent, FullRouteInfo } from '../types/routes';
import { PageLangContextProvider } from '../hooks/pageLang';
import PrevNextNavigation from './PrevNextNavigation';
import CommonHeader from './CommonHeader';

type RootLayoutIslandProps = PropsWithChildren<{
  profile: ProfileData;
  initialLang?: Language;
  currentPath: string;
  siteConfig: SiteConfig;
  routesData: {
    routes: FullRouteInfo[];
  }
}>;

const LS_LANG_KEY = 'fisherman_lang';
const NAVBAR_TOP_PADDING_CLASS = 'pt-[3.5rem]'; // Navbarの高さに合わせたパディング (実際の高さに合わせる)

export default function RootLayoutIsland({ children, profile, initialLang = 'ja', currentPath, siteConfig, routesData }: RootLayoutIslandProps) {
  const [lang, setLangOriginal] = useState<Language>(() => {
    if (typeof localStorage !== 'undefined') {
      const storedLang = localStorage.getItem(LS_LANG_KEY);
      if (storedLang && (storedLang === 'ja' || storedLang === 'en')) {
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

  // currentPath に基づいて表示するヘッダー情報を data/routes.json から検索
  const currentRouteData = routesData.routes.find(r => r.path === currentPath);

  // CommonHeader に渡すためのデータ (RouteContent 型に合わせる)
  const headerContent: RouteContent | undefined = currentRouteData
    ? {
      title: currentRouteData.title,
      description: currentRouteData.description, // data/routes.json の description を使用
      description2: currentRouteData.description2,
      description3: currentRouteData.description3,
    }
    : undefined;


  const shouldShowPrevNext = siteConfig.showPrevNextOnHomePage ? true : currentPath !== '/';

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
              <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
                <CommonHeader routeContent={headerContent} />
                {children}
                {shouldShowPrevNext && <PrevNextNavigation currentPath={currentPath} routesData={routesData} />}
              </div>
            </PageLangContextProvider>

            {/* フッターはガラスパネルの一部として表示 */}
            <footer class="mt-12 text-center text-gray-400 py-6 border-t border-slate-600/70"> {/* 境界線の色も調整 */}
              <p>
                &copy; {new Date().getFullYear()} {profile.copyrighter || profile.name}.
                {/* ★ スマートフォン表示 (smブレークポイント未満) でのみ改行 */}
                <br class="sm:hidden" />
                {/* デスクトップ表示時にスペースが入るように */}
                {' '}
                All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
