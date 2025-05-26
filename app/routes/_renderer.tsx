import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, Script } from 'honox/server'
import profile from '../../data/profile.json'
import HamburgerNav from '../islands/HamburgerNav';
import type { Context } from 'hono'
import { LangProvider } from '../hooks/useLang'; // ★ LangProvider をインポート

export default jsxRenderer(({ children }, c: Context) => {
  const pageTitle = c.get('pageTitle') || `${profile.name} - ${profile.title}`;
  const metaTags = c.get('metaTags') || [
    { name: "description", content: profile.og.description },
    // ... (他のメタタグ)
  ];

  return (
    // ★ LangProvider で全体をラップ
    <LangProvider>
      <html lang="ja"> {/* ここは lang 状態に応じて変更可能 */}
        <head>
          <meta charset="utf-8" />
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
            <HamburgerNav profile={profile} />
            {children}
            <footer class="mt-12 text-center text-gray-400 bg-gray-800 border-t border-gray-700 py-6 shadow-inner">
              <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            </footer>
          </main>
        </body>
      </html>
    </LangProvider>
  )
})
