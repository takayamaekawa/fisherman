// 多言語テキストの型
export type LocalizedString = {
  ja: string; // 日本語
  ne: string; // ネパール語
  en: string; // 英語
};

// 業務内容アイテムの型
export type TaskInfo = {
  id: string; // 識別子 (URL用など)
  title: LocalizedString; // 業務タイトル
  description: LocalizedString; // 業務内容の説明
  steps: LocalizedString[]; // 手順 (箇条書き)
  points?: LocalizedString[]; // 注意点など (任意)
  image?: string; // 関連画像のパス (任意)
  video?: string; // 関連動画のリンク (任意)
};

// 業務内容データ全体の型
export type TasksData = {
  tasks: TaskInfo[];
};
