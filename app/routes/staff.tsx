import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';
import staffData from '../../data/staff.json'; // ★ スタッフデータをインポート
import { useLang } from '../hooks/useLang'; // ★ Hook をインポート
import { translate } from '../utils/i18n'; // ★ 翻訳関数をインポート

// --- StaffItem コンポーネント (例) ---
function StaffItem({ name, position, specialty, message, image }: any) { // 型は別途定義推奨
  const { lang } = useLang();

  return (
    <div class="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4">
      {image && <img src={image} alt={name} class="w-20 h-20 rounded-full object-cover" />}
      <div class="flex-1">
        <h3 class="text-xl font-semibold">{name}</h3>
        <p class="text-gray-400">{translate(position, lang)}</p>
        <p class="mt-2 text-gray-300"><strong>得意なこと:</strong> {translate(specialty, lang)}</p>
        <p class="mt-1 text-gray-300 italic">"{translate(message, lang)}"</p>
      </div>
    </div>
  );
}

// --- ルートの定義 ---
export default createRoute(async (c) => {
  return c.render(
    <>
      <title>{profile.name} - Staff</title>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header class="text-center">
          <h1 class="text-3xl font-bold">Staff</h1>
          <p class="mt-2 text-gray-600">スタッフ情報をお届けします。</p>
        </header>
        <section class="mt-8 space-y-6">
          {/* ★ データをマップして StaffItem を表示 */}
          {staffData.staff.map((member) => (
            <StaffItem key={member.id} {...member} />
          ))}
        </section>
      </div>
    </>
  );
});
