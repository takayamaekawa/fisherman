// app/components/HamburgerNavComponent.tsx (ステップA: ダミーsetLangテスト)
import { useEffect, useState } from 'hono/jsx'; // useStateも使う可能性があるので入れておく
import { Language } from '../types/common';

type ProfileDataForNav = { name: string; };
type HamburgerNavProps = {
  profile: ProfileDataForNav;
  lang: Language;
  setLang: (newLang: Language) => void; // ★ setLang prop を受け取る
};

const HamburgerNav = ({ profile, lang, setLang }: HamburgerNavProps) => {
  // ハンバーガーメニューの開閉状態もこのコンポーネントで持つことにする
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // console.log(`[HamburgerNavComponent Effect - Step A] Props/State updated. lang: ${lang}, isOpen: ${isOpen}`);
  }, [lang, isOpen, profile]); // profileも依存配列に含める

  // console.log(`[HamburgerNavComponent Render - Step A] Rendering. lang: ${lang}, isOpen: ${isOpen}, profile: ${profile.name}`);

  const toggleMenu = () => {
    // console.log('[HamburgerNavComponent - Step A] toggleMenu called.');
    setIsOpen(!isOpen);
  };

  const handleLangChangeInternal = (newLang: Language) => {
    // console.log(`[HamburgerNavComponent - Step A] handleLangChangeInternal called with ${newLang}.`);
    // alert(`[HamburgerNavComponent - Step A] Language button ${newLang} clicked. Calling props.setLang now.`); // デバッグ用
    setLang(newLang); // propsで受け取った (この段階ではダミーの) 関数を呼び出す
    setIsOpen(false); // 言語選択後にメニューを閉じる
  };

  // 元のJSX構造をここに戻していく (TailwindのクラスやSVGも含む)
  return (
    <nav class="bg-gray-800 py-4 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="text-gray-100 font-bold text-xl">
          <a href="/" class="text-gray-100 font-bold text-xl no-underline">
            {profile.name}
          </a>
        </div>

        <div class="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu" class="focus:outline-none text-gray-100 hover:text-blue-400">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>

        <div class={`hidden md:flex items-center space-x-8`}>
          <a href="/" class="text-gray-300 hover:text-blue-500">HOME</a>
          <a href="/staff" class="text-gray-300 hover:text-blue-500">STAFF</a>
          <a href="/tasks" class="text-gray-300 hover:text-blue-500">TASKS</a>
          <a href="/contact" class="text-gray-300 hover:text-blue-500">CONTACT</a>
          <div class="flex space-x-2">
            <button onClick={() => handleLangChangeInternal('ja')} class={`px-2 py-1 rounded ${lang === 'ja' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>JA</button>
            <button onClick={() => handleLangChangeInternal('en')} class={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>EN</button>
            <button onClick={() => handleLangChangeInternal('ne')} class={`px-2 py-1 rounded ${lang === 'ne' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>NE</button>
          </div>
        </div>

        {isOpen && (
          <div class="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-md z-10">
            <div class="px-4 py-2 flex flex-col items-center space-y-2">
              <a href="/" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => { setIsOpen(false); /* toggleMenu(); でも良い */ }}>HOME</a>
              <a href="/staff" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>STAFF</a>
              <a href="/tasks" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>TASKS</a>
              <a href="/contact" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => setIsOpen(false)}>CONTACT</a>
              <div class="flex space-x-2 pt-4">
                <button onClick={() => handleLangChangeInternal('ja')} class={`px-3 py-1 rounded ${lang === 'ja' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>JA</button>
                <button onClick={() => handleLangChangeInternal('en')} class={`px-3 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>EN</button>
                <button onClick={() => handleLangChangeInternal('ne')} class={`px-3 py-1 rounded ${lang === 'ne' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:text-white'}`}>NE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default HamburgerNav;
