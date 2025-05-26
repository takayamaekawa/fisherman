import { PropsWithChildren } from 'hono/jsx'; // PropsWithChildren をインポート
import { LangProvider, useLang } from '../hooks/useLang';
import HamburgerNav from './HamburgerNav'; // HamburgerNav の props も確認
import { Link, Script } from 'honox/server';

// profile prop の型定義 (profile.json の構造に合わせて拡張可能)
type ProfileData = {
  name: string;
  title?: string; // 必要に応じて追加
  // 他に AppShell や ActualAppLayout で使う profile のフィールドがあれば追加
};

// AppShell の props の型定義
type AppShellProps = PropsWithChildren<{
  profile: ProfileData;
  pageTitle?: string; // _renderer.tsx から渡されることを想定
  metaTags?: Array<{ [key: string]: string }>; // _renderer.tsx から渡されることを想定
}>;

export default function AppShell({ children, profile, pageTitle, metaTags }: AppShellProps) {
  return (
    <LangProvider>
      <ActualAppLayout profile={profile} pageTitle={pageTitle} metaTags={metaTags}>
        {children}
      </ActualAppLayout>
    </LangProvider>
  );
}

// ActualAppLayout の props の型定義
type ActualAppLayoutProps = PropsWithChildren<{
  profile: ProfileData;
  pageTitle?: string;
  metaTags?: Array<{ [key: string]: string }>;
}>;

const ActualAppLayout = ({ children, profile, pageTitle: pageTitleFromProps, metaTags: metaTagsFromProps }: ActualAppLayoutProps) => {
  const { lang } = useLang();

  // ページタイトルを props から、なければデフォルト値を設定
  const titleToRender = pageTitleFromProps || `${profile.name} - Current Page (${lang})`;

  // メタタグを props から、なければデフォルト値を設定
  const defaultMetaTags = [
    { name: "description", content: profile.title || "Website description" }, // profile.title があれば使う
    // 他の共通メタタグ
  ];
  const metaTagsToRender = metaTagsFromProps || defaultMetaTags;


  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" /> {/* JSXではcharSetを推奨 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{titleToRender}</title>
        {metaTagsToRender.map((tag: any, i: any) => ( // metaTagsToRenderを使用
          <meta key={i} {...tag} />
        ))}
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <main class="max-w-4xl mx-auto p-4 bg-gray-800 shadow-md rounded-md flex-grow">
          {/* HamburgerNav に渡す profile の型も ProfileData と一致させる */}
          <HamburgerNav profile={{ name: profile.name }} />
          {children}
          <footer class="mt-12 text-center text-gray-400 bg-gray-800 border-t border-gray-700 py-6 shadow-inner">
            <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  );
};
