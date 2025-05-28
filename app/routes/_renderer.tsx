import { jsxRenderer } from 'hono/jsx-renderer';
import type { Context } from 'hono';
import RootLayoutIsland from '../islands/RootLayoutIsland';
import profileData from '../../data/profile.json';
import { Link, Script } from 'honox/server';

export default jsxRenderer(({ children }, c: Context) => {
  const pageTitle = c.get('pageTitle') || `${profileData.name} - ${profileData.title || 'Welcome'}`;
  const metaTags = c.get('metaTags') || [
    { name: "description", content: profileData.og.description },
    { property: "og:title", content: profileData.og.title },
    { property: "og:description", content: profileData.og.description },
    { property: "og:image", content: profileData.og.image },
    { property: "og:url", content: profileData.og.url },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: profileData.og.title },
    { name: "twitter:description", content: profileData.og.description },
    { name: "twitter:image", content: profileData.og.image },
  ];

  // SSR時の初期言語 (ここでは'ja'固定、必要なら動的に設定)
  const ssrInitialLang = 'ja';
  // 白い色味を完全になくし、ブラー効果だけにしたい場合 -> bg-transparent に変更
  const glassClasses = 'bg-white/5';

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
        <Script src="/app/client.ts" async />
      </head>
      <body class="font-sans antialiased text-gray-100 bg-gray-900">
        {/* ★ p-4 を削除 */}
        <main class="relative overflow-hidden rounded-md shadow-lg mx-auto max-w-4xl">
          <div class={`relative z-10 backdrop-blur-md p-6 ${glassClasses} rounded-lg border border-white/20`}>
            <RootLayoutIsland profile={profileData} initialLang={ssrInitialLang}>
              {children}
            </RootLayoutIsland>
          </div>
        </main>
      </body>
    </html >
  );
});
