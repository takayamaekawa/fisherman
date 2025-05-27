import { LocalizedString } from "./common";

// ★ 手順の各アイテムの型を定義
export type StepItem = {
  type: 'step';
  text: LocalizedString; // テキストによる手順
};

export type ImageItem = {
  type: 'image';
  path: string;          // 画像のパス
  alt: LocalizedString;  // 画像のaltテキスト (翻訳可能)
};

// ProcedureItem は StepItem または ImageItem のどちらか
export type ProcedureItem = StepItem | ImageItem;

// 業務内容アイテムの型を更新
export type TaskInfo = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  procedure: ProcedureItem[]; // ★ "steps" から "procedure" に変更し、型を更新
  points?: LocalizedString[];
  image?: string; // タスク全体のメイン画像 (これは残しても良い)
  video?: string;
};

// 業務内容データ全体の型
export type TasksData = {
  tasks: TaskInfo[];
};
