// app/islands/RootLayoutIsland.tsx (ステップB: 実際のsetLangを渡す)
import { useState, useEffect, PropsWithChildren } from 'hono/jsx';
import HamburgerNav from '../islands/HamburgerNav';
import { Language } from '../types/common';

type ProfileData = { name: string; title?: string; };
type RootLayoutIslandProps = PropsWithChildren<{
  profile: ProfileData;
  initialLang?: Language;
}>;

export default function RootLayoutIsland({ children, profile, initialLang = 'ja' }: RootLayoutIslandProps) {
  const [lang, setLangOriginal] = useState<Language>(initialLang); // useStateの更新関数は setLangOriginal
  useEffect(() => {
    console.log('[RootLayoutIsland Effect - Step B: Real setLang] Language is now:', lang);
    if (typeof document !== 'undefined') { document.documentElement.lang = lang; }
  }, [lang]);
  console.log('[RootLayoutIsland Render - Step B: Real setLang] Rendering with lang:', lang);

  // dummySetLangForNav は削除します

  return (
    <>
      <HamburgerNav
        profile={{ name: profile.name }}
        lang={lang}
        setLang={setLangOriginal} // ★ RootLayoutIsland の実際の setLang (setLangOriginal) を渡す
      />
      <h1>Content After Nav (Step B: Real setLang)</h1>
      {/* この lang表示が動的に変わるか注目 */}
      <p>Current language in RootLayout: {lang}</p>
      <p>Profile Name (in RootLayout): {profile.name}</p>
      <div>{children}</div>
      <footer class="mt-12 text-center text-gray-400 bg-gray-800 border-t border-gray-700 py-6 shadow-inner">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
