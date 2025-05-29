import { generalMessages } from '../locales/translations'; // generalMessagesのキーを参照するため

// ナビゲーションアイテムの型
export type NavItem = {
  path: string; // 例: "/", "/about", "/projects"
  // generalMessages の中の、このページのタイトルに対応するキー名
  titleKey: keyof typeof generalMessages;
};

// サイトの主要なページの順序を定義
export const mainNavigationSequence: NavItem[] = [
  { path: '/', titleKey: 'homeTitle' },
  { path: '/staff', titleKey: 'staffTitle' },
  { path: '/tasks', titleKey: 'tasksTitle' },
  { path: '/contact', titleKey: 'contactTitle' },
  // 他の主要なページがあれば、順番に追加
];

export function getNextPage(currentPath: string): NavItem | null {
  const currentIndex = mainNavigationSequence.findIndex(item => item.path === currentPath);
  if (currentIndex !== -1 && currentIndex < mainNavigationSequence.length - 1) {
    return mainNavigationSequence[currentIndex + 1];
  }
  // 最後のページならホームページに戻す場合 (オプション)
  // if (currentIndex === mainNavigationSequence.length - 1 && mainNavigationSequence.length > 1) {
  //   return mainNavigationSequence[0];
  // }
  return null;
}

// ★「前のページ」を取得する関数を追加
export function getPreviousPage(currentPath: string): NavItem | null {
  const currentIndex = mainNavigationSequence.findIndex(item => item.path === currentPath);
  if (currentIndex !== -1 && currentIndex > 0) { // 最初のページでなければ前のページが存在
    return mainNavigationSequence[currentIndex - 1];
  }
  // 最初のページなら一番最後のページに戻す場合 (オプション)
  // if (currentIndex === 0 && mainNavigationSequence.length > 1) {
  //   return mainNavigationSequence[mainNavigationSequence.length - 1];
  // }
  return null;
}
