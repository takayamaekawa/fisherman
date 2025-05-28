import { usePageLang } from '../hooks/pageLang';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';

const IndexContent = () => {
  const { lang } = usePageLang();
  // console.log('[IndexContent Island] Rendered. Current lang:', lang);

  return (
    <div class="text-center">
      <p class="text-xl text-gray-400 mt-2 underline font-bold">
        {translate(generalMessages.homeDescription2, lang)}
      </p>
      <p class="mt-4 text-gray-400">
        {translate(generalMessages.homeDescription3, lang)}
      </p>

      {/* リンクコンテナ */}
      <div
        class="mt-8 flex flex-wrap justify-center items-center 
               gap-x-6 gap-y-3 {/* アイテム間の横方向と縦方向の隙間 */}
               md:flex-nowrap {/* md以上では折り返さない */}
               md:space-x-6   {/* md以上ではアイテム間の横スペースをspace-xで制御 (gap-yは影響しなくなる) */}
              "
      >
        {/* 各リンクアイテムに幅を指定して、モバイルで2列になるように調整します。
          例: basis-[45%] は、親要素の幅の45%を基本幅とします。
          md:basis-auto で、デスクトップでは幅を自動に戻します。
        */}
        <a href="/staff" class="text-blue-400 underline hover:text-blue-300 py-1 px-2 basis-[45%] md:basis-auto text-center">
          {translate(generalMessages.staffTitle, lang)}
        </a>
        <a href="/tasks" class="text-blue-400 underline hover:text-blue-300 py-1 px-2 basis-[45%] md:basis-auto text-center">
          {translate(generalMessages.tasksTitle, lang)}
        </a>
        <a href="/contact" class="text-blue-400 underline hover:text-blue-300 py-1 px-2 basis-[45%] md:basis-auto text-center">
          {translate(generalMessages.contactTitle, lang)}
        </a>
        {/* もしリンクが4つになった場合でも、モバイルでは2x2、デスクトップでは1x4になります */}
        {/* <a href="/projects" class="text-blue-400 underline hover:text-blue-300 py-1 px-2 basis-[45%] md:basis-auto text-center">
          {translate(generalMessages.projectsTitle, lang)}
        </a> 
        */}
      </div>
    </div>
  );
};

export default IndexContent;
