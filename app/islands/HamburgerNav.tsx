// app/islands/HamburgerNav.tsx (ステップ3: useLangと実際の言語切り替え機能の復元)
import { useState, useEffect } from 'hono/jsx';
import { useLang, type Language } from '../hooks/useLang'; // ★ useLang を復元

type ProfileData = {
  name: string;
};

type HamburgerNavProps = {
  profile: ProfileData;
};

const HamburgerNav = ({ profile }: HamburgerNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang(); // ★ useLangフックを呼び出す

  useEffect(() => {
    console.log(`[HamburgerNav Client Effect] Mounted/Updated. isOpen: ${isOpen}, lang: ${lang}`);
  }, [isOpen, lang]); // 依存配列に lang を追加

  // このログはデバッグが完了したら削除しても良いでしょう
  console.log(`[HamburgerNav Render] Rendering. isOpen: ${isOpen}, lang: ${lang}, typeof setLang: ${typeof setLang}`);

  const toggleMenu = () => {
    console.log('[HamburgerNav] toggleMenu button CLICKED! Current isOpen:', isOpen);
    setIsOpen(!isOpen);
  };

  // handleLangChange を元のロジックに戻す
  const handleLangChange = (newLang: Language) => { // ★ 型を Language に戻す
    console.log(`[HamburgerNav] handleLangChange called with: ${newLang}. Current lang: ${lang}`);
    if (typeof setLang === 'function') {
      setLang(newLang); // ★ 実際のsetLangを呼び出す (LangProviderのupdateLang)
      console.log(`[HamburgerNav] setLang('${newLang}') was called.`);
    } else {
      // このエラーが出ることは、useLangの実装から考えにくいが念のため残す
      console.error('[HamburgerNav] ERROR: setLang is not a function!');
      alert('Error: setLang is not a function. Check console.');
    }
    setIsOpen(false); // メニューを閉じる
  };

  return (
    <nav class="bg-gray-800 py-4 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="text-gray-100 font-bold text-xl">
          <a href="/" class="text-gray-100 font-bold text-xl no-underline">
            {profile.name}
          </a>
        </div>

        <div class="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            class="focus:outline-none text-gray-100 hover:text-blue-400"
          >
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>

        {/* デスクトップメニュー - 言語ボタンのクラスに lang 依存を復元 */}
        <div class={`hidden md:flex items-center space-x-8`}>
          <a href="/" class="text-gray-300 hover:text-blue-500">HOME</a>
          <a href="/staff" class="text-gray-300 hover:text-blue-500">STAFF</a>
          <a href="/tasks" class="text-gray-300 hover:text-blue-500">TASKS</a>
          <a href="/contact" class="text-gray-300 hover:text-blue-500">CONTACT</a>
          <div class="flex space-x-2">
            {/* ★ classNameに lang 依存を復元 */}
            <button onClick={() => handleLangChange('ja')} class={`px-2 py-1 rounded ${lang === 'ja' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>JA</button>
            <button onClick={() => handleLangChange('ne')} class={`px-2 py-1 rounded ${lang === 'ne' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>NE</button>
            <button onClick={() => handleLangChange('en')} class={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>EN</button>
          </div>
        </div>

        {/* モバイルメニュー - 言語ボタンのクラスに lang 依存を復元 */}
        {isOpen && (
          <div class="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-md z-10">
            <div class="px-4 py-2 flex flex-col items-center space-y-2">
              <a href="/" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>HOME</a>
              <a href="/staff" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>STAFF</a>
              <a href="/tasks" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>TASKS</a>
              <a href="/contact" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>CONTACT</a>
              <div class="flex space-x-2 pt-4">
                {/* ★ classNameに lang 依存を復元 */}
                <button onClick={() => handleLangChange('ja')} class={`px-3 py-1 rounded ${lang === 'ja' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>JA</button>
                <button onClick={() => handleLangChange('ne')} class={`px-3 py-1 rounded ${lang === 'ne' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>NE</button>
                <button onClick={() => handleLangChange('en')} class={`px-3 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>EN</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HamburgerNav;
