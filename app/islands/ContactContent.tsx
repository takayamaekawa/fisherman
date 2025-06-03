import { usePageLang } from '../hooks/pageLang';
import { renderName } from './Renders';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';
import type { ContactPerson } from '../types/contact';
import type { Language } from '../types/common';

type ContactPersonItemProps = ContactPerson & {
  lang: Language;
};

function ContactPersonItem({ name, position, specialty, way, lang }: ContactPersonItemProps) {
  return (
    <>
      <div class="bg-gray-700 p-6 rounded-lg shadow-lg mb-6 text-left">
        <h3 class="text-2xl font-semibold text-gray-100">{renderName(name, lang)}</h3>
        <p class="text-gray-400 mt-1">{translate(position, lang)}</p>
        <p class="text-gray-300 mt-2">{translate(specialty, lang)}</p>

        {/* TEL */}
        {way.tel && (
          <p class="mt-4">
            <strong class="text-gray-200">{translate(generalMessages.telLabel, lang)}</strong>
            <br class="sm:hidden" />
            <a href={`tel:${way.tel.replace(/-/g, '')}`} class="ml-2 text-blue-400 hover:text-blue-300 break-all"> {/* break-allを追加しても良い */}
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
              // ★ break-all クラスを追加して、長いメールアドレスが折り返すようにする
              class="ml-2 text-blue-400 hover:text-blue-300 break-all"
            >
              {way.email}
            </a>
          </p>
        )}
      </div>
    </>
  );
}

// ContactPageContent Props
type ContactPageContentProps = {
  contactList: ContactPerson[];
};

const ContactContent = ({ contactList }: ContactPageContentProps) => {
  const { lang } = usePageLang();
  // console.log('[ContactPageContent Island] Rendered. Current lang:', lang);

  return (
    <section class="mt-12 space-y-8">
      {contactList.map((person, index) => (
        <ContactPersonItem key={index} {...person} lang={lang} />
      ))}
    </section>
  );
};

export default ContactContent;
