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
      <body class="font-sans antialiased bg-gray-900 text-gray-100">
        <main class="max-w-4xl mx-auto p-4 bg-gray-800 shadow-md rounded-md flex-grow">
          <RootLayoutIsland
            profile={profileData} // profileData全体を渡すか、必要な部分だけにするか検討
            initialLang={ssrInitialLang}
          >
            {children}
          </RootLayoutIsland>
        </main>
      </body>
    </html>
  );
});
