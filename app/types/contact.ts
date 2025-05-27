import type { LocalizedString } from './common'; // または common.ts
import type { NameRuby } from './common';

export type ContactWay = { // ★ wayオブジェクトの型
  tel?: string;
  email?: string;
};

export type ContactPerson = {
  name: NameRuby;
  position: LocalizedString;
  specialty: LocalizedString;
  way: ContactWay; // ★ wayオブジェクトを使用
};

export type ContactData = {
  contact: ContactPerson[];
};
