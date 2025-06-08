import type { LocalizedString } from './common';
import type { NameRuby } from './common';

export type ContactWay = {
  tel?: string;
  email?: string;
};

export type SocialLink = {
  label: LocalizedString;
  url: string;
}

export type ContactPerson = {
  name: NameRuby;
  position: LocalizedString;
  specialty: LocalizedString;
  way: ContactWay;
  social?: SocialLink[];
};

export type ContactData = {
  contact: ContactPerson[];
};
