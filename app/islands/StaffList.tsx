import { usePageLang } from '../hooks/pageLang';
import type { Language } from '../types/common';
import type { StaffMember, StaffName } from '../types/staff'; // 作成した型をインポート
import { translate } from '../utils/i18n';
import type { LocalizedString } from '../types/common'; // 再利用
import { generalMessages } from '../locales/translations';

interface StaffMemberUpdated extends Omit<StaffMember, 'name'> { // Omitを使ってnameを上書き
  name: StaffName;
}
// StaffItemPropsの型も更新
type StaffItemPropsUpdated = StaffMemberUpdated & {
  lang: Language;
};


function StaffItem({ name, position, specialty, message, image, lang }: StaffItemPropsUpdated) { // ★ 型を変更

  const renderName = () => {
    if (typeof name === 'string') {
      return name; // 単純な文字列の場合
    }
    if ('text' in name && 'ruby' in name) { // ふりがなオブジェクトの場合 (日本語想定)
      if (lang !== 'ja') {
        return <ruby>{name.text}<rt>{name.ruby}</rt></ruby>;
      }
      return name.text; // 他言語ではふりがななし
    }
    // LocalizedString の場合 (ネパール語名などに対応)
    return translate(name as LocalizedString, lang);
  };

  return (
    <div class="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4">
      {image && <img src={image} alt={typeof name === 'string' ? name : ('text' in name ? name.text : name.ja)} class="w-20 h-20 rounded-full object-cover" />}
      <div class="flex-1">
        <h3 class="text-xl font-semibold">{renderName()}</h3> {/* ★ renderName()を使用 */}
        <p class="text-gray-400">{translate(position, lang)}</p>
        <p class="mt-2 text-gray-300"><strong>{translate(generalMessages.staffSpecialtyLabel, lang)}</strong> {translate(specialty, lang)}</p>
        <p class="mt-1 text-gray-300 italic">"{translate(message, lang)}"</p>
      </div>
    </div>
  );
}

// StaffListコンポーネントのprops型も更新
type StaffListPropsUpdated = {
  staffMembers: StaffMemberUpdated[];
};

const StaffList = ({ staffMembers }: StaffListPropsUpdated) => { // ★ 型を変更
  const { lang } = usePageLang();
  // ...
  return (
    <>
      {staffMembers.map((member) => (
        <StaffItem
          key={`<span class="math-inline">\{member\.id\}\-</span>{lang}`}
          {...member}
          lang={lang}
        />
      ))}
    </>
  );
};
export default StaffList;
