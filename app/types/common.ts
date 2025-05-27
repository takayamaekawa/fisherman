// 多言語テキストの型
export type LocalizedString = {
  ja: string; // 日本語
  ne: string; // ネパール語
  en: string; // 英語
};

export type Language = 'ja' | 'ne' | 'en';

export type NameRuby = string | { text: string; ruby: string } | LocalizedString;
