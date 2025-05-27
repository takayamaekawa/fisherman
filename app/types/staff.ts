import type { LocalizedString } from './common'; // LocalizedStringを再利用

export type StaffName = string | { text: string; ruby: string } | LocalizedString;

export type StaffMember = {
  id: string;
  name: StaffName; // 名前は翻訳対象外とするか、それもLocalizedにするかによります
  position: LocalizedString;
  specialty: LocalizedString;
  message: LocalizedString;
  image?: string;
};

export type StaffData = {
  staff: StaffMember[];
};
