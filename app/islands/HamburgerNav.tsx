import { useState, useEffect, useCallback } from 'hono/jsx';
import { Language } from '../types/common';

type ProfileDataForNav = { name: string; };
type HamburgerNavProps = {
  profile: ProfileDataForNav;
  lang: Language;
  setLang: (newLang: Language) => void;
};

const NAVBAR_HEIGHT_PX = 56; // 仮のNavbarの高さ (ピクセル)
const SCROLL_THRESHOLD = 5;  // スクロール検知の閾値 (ピクセル)
const navbarActualHeight = '3.5rem'; // CSSで使用するNavbarの高さ (例)

const HamburgerNav = ({ profile, lang, setLang }: HamburgerNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) < SCROLL_THRESHOLD) {
      return;
    }
    if (currentScrollY > lastScrollY && currentScrollY > NAVBAR_HEIGHT_PX) {
      setNavVisible(false);
    } else {
      if (currentScrollY < lastScrollY || currentScrollY <= NAVBAR_HEIGHT_PX) {
        setNavVisible(true);
      }
    }
    setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    setLastScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLangChangeInternal = (newLang: Language) => {
    setLang(newLang);
    setIsOpen(false);
  };

  // ★ nav要素のクラスを変更
  const navClasses = `bg-gray-800 py-4 fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ease-in-out 
    ${navVisible ? 'transform-none' : '-translate-y-full'}
    mx-auto max-w-4xl`; // ★ 中央揃えと最大幅を追加 (w-full を削除)

  return (
    <nav class={navClasses} style={{ height: navbarActualHeight }}>
      {/* ★ 内側のdivのクラスを調整 */}
      <div class="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
        {/* ロゴ */}
        <div class="text-gray-100 font-bold text-xl">
          <a href="/" class="text-gray-100 font-bold text-xl no-underline">
            {profile.name}
          </a>
        </div>

        {/* デスクトップメニュー */}
        <div class="hidden md:flex items-center space-x-8">
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

        {/* モバイル用ハンバーガーボタン */}
        <div class="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu" class="focus:outline-none text-gray-100 hover:text-blue-400">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (<path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z" />) : (<path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />)}
            </svg>
          </button>
        </div>

        {/* モバイルメニュー Dropdown */}
        {/* このメニューは親のnav要素の幅に追従します */}
        {isOpen && (
          <div
            class="md:hidden absolute top-full left-0 w-full bg-gray-800 shadow-lg overflow-y-auto"
            style={{ maxHeight: `calc(100vh - ${navbarActualHeight})` }}
          >
            <div class="px-4 py-2 flex flex-col items-center space-y-2">
              <a href="/" class="text-gray-300 hover:text-blue-500 py-2" onClick={() => { setIsOpen(false); }}>HOME</a>
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
