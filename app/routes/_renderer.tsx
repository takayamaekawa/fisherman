// app/routes/_renderer.tsx (修正版)
import { jsxRenderer } from 'hono/jsx-renderer';
import type { Context } from 'hono';
import RootLayoutIsland from '../islands/RootLayoutIsland';
import profileData from '../../data/profile.json';
import { Link, Script } from 'honox/server'; // LinkとScriptはこちらで管理

export default jsxRenderer(({ children }, c: Context) => {
  const pageTitle = c.get('pageTitle') || `${profileData.name} - ${profileData.title || 'Welcome'}`;
  const metaTags = c.get('metaTags') || [
    { name: "description", content: profileData.og?.description || profileData.title || "Description" },
    { property: "og:title", content: profileData.og?.title || pageTitle },
    // ... 他のメタタグ (以前の_renderer.tsxからコピー)
  ];

  // SSR時の初期言語 (ここでは'ja'固定、必要なら動的に設定)
  const ssrInitialLang = 'ja';

  return (
    // ★ RootLayoutIslandのuseEffectでクライアントで更新されるが、SSR時にも設定
    <html lang={ssrInitialLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        {metaTags.map((tag: any, i: any) => (
          <meta key={i} {...tag} />
        ))}
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async /> {/* Scriptタグは通常1つ */}
      </head>
      <body class="font-sans antialiased bg-gray-900 text-gray-100">
        <main class="max-w-4xl mx-auto p-4 bg-gray-800 shadow-md rounded-md flex-grow">
          <RootLayoutIsland
            profile={profileData} // profileData全体を渡すか、必要な部分だけにするか検討
            initialLang={ssrInitialLang}
          >
            {children}
          </RootLayoutIsland>
        </main>
        {/* フッターはRootLayoutIslandに移動させたので、ここからは削除 (重複を避ける) */}
      </body>
    </html>
  );
});
