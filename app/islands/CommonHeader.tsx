import { usePageLang } from '../hooks/pageLang';
import { translate } from '../utils/i18n';
import type { LocalizedString } from '../types/common';

type CommonHeaderProps = {
  titleContent: LocalizedString;
  descriptionContent: LocalizedString;
};

const CommonHeader = ({ titleContent, descriptionContent }: CommonHeaderProps) => {
  const { lang } = usePageLang();
  // console.log('[CommonHeader Island] Rendered. Current lang:', lang);

  return (
    <header class="text-center">
      <h1 class="text-3xl font-bold">{translate(titleContent, lang)}</h1>
      <p class="text-xl text-gray-400 mt-2">{translate(descriptionContent, lang)}</p>
    </header>
  );
}

export default CommonHeader;
