// app/routes/contact.tsx
import { createRoute } from 'honox/factory';
import ContactPageContent from '../islands/ContactPageContent';
import CommonHeader from '../islands/CommonHeader';         // ★ 共通ヘッダー
import { generalMessages } from '../locales/translations'; // ★ 翻訳データ
import contactDataJson from '../../data/contact.json';
import type { ContactData } from '../types/contact';

const typedContactData = contactDataJson as ContactData;

export default createRoute(async (c) => {
  return c.render(
    <>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <CommonHeader
          titleContent={generalMessages.contactTitle}
          descriptionContent={generalMessages.contactDescription}
        />
        <ContactPageContent contactList={typedContactData.contact} />
      </div>
    </>
  );
});
