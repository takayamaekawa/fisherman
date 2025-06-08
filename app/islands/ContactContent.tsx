import { usePageLang } from '../hooks/pageLang';
import { renderName } from './Renders';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';
import type { ContactPerson, SocialLink } from '../types/contact'; // SocialLink もインポート
import type { Language } from '../types/common';

type ContactPersonItemProps = ContactPerson & {
  lang: Language;
};

// props の分割代入に social を追加
function ContactPersonItem({ name, position, specialty, way, social, lang }: ContactPersonItemProps) {
  return (
    <div class="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-left">
      <h3 class="text-2xl font-semibold text-gray-100">{renderName(name, lang)}</h3>
      <p class="text-gray-400 mt-1">{translate(position, lang)}</p>
      <p class="text-gray-300 mt-2">{translate(specialty, lang)}</p>

      {/* TEL */}
      {way.tel && (
        <p class="mt-4">
          <strong class="text-gray-200">{translate(generalMessages.telLabel, lang)}</strong>
          <br class="sm:hidden" />
          <a href={`tel:${way.tel.replace(/-/g, '')}`} class="ml-2 text-blue-400 hover:text-blue-300 break-all text-link">
            {way.tel}
          </a>
        </p>
      )}
      {/* Email */}
      {way.email && (
        <p class="mt-2">
          <strong class="text-gray-200">{translate(generalMessages.emailLabel, lang)}</strong>
          <br class="sm:hidden" />
          <a
            href={`mailto:${way.email}`}
            class="ml-2 text-blue-400 hover:text-blue-300 break-all text-link"
          >
            {way.email}
          </a>
        </p>
      )}

      {/* ★★★ ここからソーシャルリンクのセクションを追加 ★★★ */}
      {social && social.length > 0 && (
        // 上のセクションとの区切り線
        <div class="mt-4 pt-4 border-t border-gray-600">
          <strong class="text-gray-200 block mb-3">
            {translate(generalMessages.socialLinksLabel, lang)}
          </strong>
          {/* リンクコンテナ: flexとflex-wrapでレスポンシブに対応 */}
          <div class="flex flex-wrap gap-3">
            {social.map((site: SocialLink) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank" // 外部リンクは新しいタブで開く
                rel="noopener noreferrer"
                // リンクの見た目をボタン風にスタイリング
                class="inline-block bg-slate-600 hover:bg-slate-500 text-gray-200 hover:text-white font-semibold py-1 px-4 rounded-lg transition-colors duration-150 text-sm"
              >
                {translate(site.label, lang)}
              </a>

            ))}
          </div>
        </div>
      )}
      {/* ★★★ ここまで ★★★ */}

    </div>
  );
}

// ContactContent Props
type ContactPageContentProps = {
  contactList: ContactPerson[];
};

const ContactContent = ({ contactList }: ContactPageContentProps) => {
  const { lang } = usePageLang();
  // console.log('[ContactPageContent Island] Rendered. Current lang:', lang);

  return (
    <section class="mt-12 space-y-8">
      {contactList.map((person, index) => (
        // スプレッド構文 (...) で person の全プロパティ (socialを含む) を渡す
        <ContactPersonItem key={index} {...person} lang={lang} />
      ))}
    </section>
  );
};

export default ContactContent;
