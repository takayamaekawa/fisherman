import { createRoute } from 'honox/factory';
import HomePageContent from '../islands/HomePageContent'; // ★ HomePageContent Islandをインポート
import CommonHeader from '../islands/CommonHeader';      // ★ 共通ヘッダーIsland
import { generalMessages } from '../locales/translations'; // ★ 翻訳データをインポート

export default createRoute(async (c) => {
  // ページタイトルは RootLayoutIsland または _renderer.tsx で設定
  // c.set('pageTitle', translate(generalMessages.homeTitle, lang_on_server)); // SSRで言語設定できれば
  return c.render(
    <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
      <CommonHeader
        titleContent={generalMessages.homeTitle}
        descriptionContent={generalMessages.homeDescription}
      />
      <HomePageContent /> {/* HomePageContentはヘッダー以外のコンテンツをレンダリング */}
    </div>);
});
