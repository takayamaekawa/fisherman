import { usePageLang } from '../hooks/pageLang';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';

// もし RootLayoutIsland から profile データの一部を props で渡すなら型定義が必要。

const HomePageContent = () => {
  const { lang } = usePageLang();
  // console.log('[HomePageContent Island] Rendered. Current lang:', lang);

  return (
    <div class="mt-6 space-x-4 text-center">
      <a href="/staff" class="text-blue-400 underline hover:text-blue-300">{translate(generalMessages.staffTitle, lang)}</a>
      <a href="/tasks" class="text-blue-400 underline hover:text-blue-300">{translate(generalMessages.tasksTitle, lang)}</a>
      <a href="/contact" class="text-blue-400 underline hover:text-blue-300">{translate(generalMessages.contactTitle, lang)}</a>
    </div>
  );
};

export default HomePageContent;
