import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import profile from '../../data/profile.json'
import HamburgerNav from '../islands/HamburgerNav';
import type { Context } from 'hono' // ★ Context 型をインポート

// ★ jsxRenderer のコールバックの第二引数に c: Context を追加
export default jsxRenderer(({ children }, c: Context) => {
  // ★ c.get() を使ってコンテキストから値を取得。なければデフォルト値を使う。
  const pageTitle = c.get('pageTitle') || `${profile.name} - ${profile.title}`;
  const metaTags = c.get('metaTags') || [ // デフォルトのOGPを設定
    { name: "description", content: profile.og.description },
    { property: "og:title", content: profile.og.title },
    { property: "og:description", content: profile.og.description },
    { property: "og:image", content: profile.og.image },
    { property: "og:url", content: profile.og.url },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: profile.og.title },
    { name: "twitter:description", content: profile.og.description },
    { name: "twitter:image", content: profile.og.image },
  ];

  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title> {/* c.get() で取得した title を使う */}
        {/* c.get() で取得した metaTags を使う */}
        {metaTags.map((tag: any, i: any) => (
          <meta key={i} {...tag} />
        ))}
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body class="font-sans antialiased bg-gray-900 text-gray-100">
        <main class="max-w-4xl mx-auto p-4 bg-gray-800 shadow-md rounded-md flex-grow">
          <HamburgerNav />
          {children}
          <footer class="mt-12 text-center text-gray-400 bg-gray-800 border-t border-gray-700 py-6 shadow-inner">
            <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          </footer>
        </main>
      </body>
    </html>
  )
})
