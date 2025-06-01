import { useState, useEffect } from 'hono/jsx';
import { usePageLang } from '../hooks/pageLang';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';
import { getNextPage, getPreviousPage, type NavItem } from '../config/navigation';

// ★★★ ArrowIcon ヘルパーコンポーネントを定義 ★★★
type ArrowIconProps = {
  direction: 'left' | 'right';
  // 追加のCSSクラスを渡せるようにする (マージンなど)
  className?: string;
};

const ArrowIcon = ({ direction, className = '' }: ArrowIconProps) => {
  const commonPath = "M13.5 4.5 21 12m0 0L13.5 19.5M21 12H3"; // 右向き矢印のパス

  // 基本クラス + 渡された追加クラス + 方向に応じた回転クラス
  let svgClassName = `h-5 w-5 sm:h-6 sm:w-6 shrink-0 ${className}`;
  if (direction === 'left') {
    svgClassName += ' rotate-180 origin-center';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2" // SVG属性なのでケバブケースのまま
      stroke="currentColor"
      class={svgClassName.trim()} // 計算されたクラスを適用
    >
      <path stroke-linecap="round" stroke-linejoin="round" d={commonPath} />
    </svg>
  );
};

type PrevNextNavigationProps = {
  currentPath: string;
};

const PrevNextNavigation = ({ currentPath }: PrevNextNavigationProps) => {
  const { lang } = usePageLang();
  // ★ useStateの初期値でページ情報を設定
  const [previousPageInfo, setPreviousPageInfo] = useState<NavItem | null>(() => getPreviousPage(currentPath));
  const [nextPageInfo, setNextPageInfo] = useState<NavItem | null>(() => getNextPage(currentPath));

  // ★ currentPath が変更された場合（SPA的な遷移があれば）にページ情報を更新
  useEffect(() => {
    setPreviousPageInfo(getPreviousPage(currentPath));
    setNextPageInfo(getNextPage(currentPath));
    // console.log(`[PrevNextNavigation] Path updated: ${currentPath}, Prev: ${getPreviousPage(currentPath)?.path}, Next: ${getNextPage(currentPath)?.path}`);
  }, [currentPath]);

  // ★ ホームページの場合は RootLayoutIsland側でレンダリングしないようにする
  //    このコンポーネント自体は、渡されたcurrentPathに基づいて常に prev/next を計算する
  if (currentPath === '/') { // このチェックはRootLayoutIslandに任せるので、ここでは必須ではないが、二重チェックとして残しても良い
    // RootLayoutIsland側で制御しているので、このコンポーネントが呼ばれる時点で '/' ではないはず
    // ただし、直接このコンポーネントが '/' で呼ばれた場合のガードにはなる
    // return null; 
  }

  // 表示するナビゲーションがない場合は何もレンダリングしない
  if (!previousPageInfo && !nextPageInfo) {
    // console.log('[PrevNextNavigation] No prev or next page info, rendering null.');
    return null;
  }

  const prevPageTitle = previousPageInfo && generalMessages[previousPageInfo.titleKey]
    ? translate(generalMessages[previousPageInfo.titleKey], lang)
    : previousPageInfo?.titleKey; // フォールバック

  const nextPageTitle = nextPageInfo && generalMessages[nextPageInfo.titleKey]
    ? translate(generalMessages[nextPageInfo.titleKey], lang)
    : nextPageInfo?.titleKey; // フォールバック

  return (
    <div class="mt-10 mb-8 py-5 px-4 sm:px-6 bg-slate-800/70 border border-slate-700/60 rounded-lg shadow-xl flex flex-col sm:flex-row justify-between items-stretch gap-4">
      {/* Previous Page Link Area */}
      {previousPageInfo ? (
        <a
          href={previousPageInfo.path}
          class="group flex-1 flex items-center p-3 sm:p-4 rounded-md hover:bg-slate-700/80 transition-colors duration-150 text-gray-300 hover:text-white no-underline"
        >
          {/* ★ ArrowIcon コンポーネントを使用 */}
          <ArrowIcon direction="left" className="mr-2 sm:mr-3 text-gray-400 group-hover:text-white transition-colors" />
          <div class="text-left">
            <span class="text-xs text-gray-400 block group-hover:text-gray-200 transition-colors">
              {translate(generalMessages.prevButtonText, lang)}
            </span>
            {prevPageTitle && (
              <span class="text-sm sm:text-base font-semibold block">
                {prevPageTitle}
              </span>
            )}
          </div>
        </a>
      ) : (
        <div class="flex-1"></div> // Previousがない場合にスペースを維持するための空div
      )}

      {/* Next Page Link Area */}
      {nextPageInfo ? (
        <a
          href={nextPageInfo.path}
          class="group flex-1 flex items-center justify-end p-3 sm:p-4 rounded-md hover:bg-slate-700/80 transition-colors duration-150 text-gray-300 hover:text-white no-underline"
        >
          <div class="text-right">
            <span class="text-xs text-gray-400 block group-hover:text-gray-200 transition-colors">
              {translate(generalMessages.nextButtonText, lang)}
            </span>
            {nextPageTitle && (
              <span class="text-sm sm:text-base font-semibold block">
                {nextPageTitle}
              </span>
            )}
          </div>
          {/* ★ ArrowIcon コンポーネントを使用 */}
          <ArrowIcon direction="right" className="ml-2 sm:ml-3 text-gray-400 group-hover:text-white transition-colors" />
        </a>
      ) : (
        <div class="flex-1"></div> // Nextがない場合にスペースを維持するための空div
      )}
    </div>
  );
};

export default PrevNextNavigation;
