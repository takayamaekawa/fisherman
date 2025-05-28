import { usePageLang } from '../hooks/pageLang';
import type { Language } from '../types/common';
import type { StaffMember } from '../types/staff';
import type { NameRuby } from '../types/common';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';
import { renderName } from '../islands/Renders';

interface StaffMemberUpdated extends Omit<StaffMember, 'name'> { // Omitを使ってnameを上書き
  name: NameRuby;
}
// StaffItemPropsの型も更新
type StaffItemPropsUpdated = StaffMemberUpdated & {
  lang: Language;
};

function StaffItem({ name, position, specialty, message, image, lang }: StaffItemPropsUpdated) {
  return (
    <div class="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4">
      {image && <img src={image} alt={typeof name === 'string' ? name : ('text' in name ? name.text : name.ja)} class="w-20 h-20 rounded-full object-cover" />}
      <div class="flex-1">
        <h3 class="text-xl font-semibold">{renderName(name, lang)}</h3>
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

const StaffList = ({ staffMembers }: StaffListPropsUpdated) => {
  const { lang } = usePageLang();
  return (
    <>
      {staffMembers.map((member) => (
        <StaffItem
          key={`${member.id}-${lang}`}
          {...member}
          lang={lang}
        />
      ))}
    </>
  );
};
export default StaffList;
