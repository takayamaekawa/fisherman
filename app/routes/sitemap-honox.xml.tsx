import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';

const pages = [
  {
    loc: '/',
    lastmod: new Date().toISOString(),
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    loc: '/staff',
    lastmod: new Date().toISOString(),
    priority: '0.6',
    changefreq: 'weekly',
  },
  {
    loc: '/tasks',
    lastmod: new Date().toISOString(),
    priority: '0.7',
    changefreq: 'weekly',
  },
  {
    loc: '/contact',
    lastmod: new Date().toISOString(),
    priority: '0.5',
    changefreq: 'weekly',
  },
];

export default createRoute(async (c) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
      .map(
        (page) => `
    <url>
      <loc>${profile.url}${page.loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
      )
      .join('')}
</urlset>`;
  c.header('Content-Type', 'application/xml');
  return c.body(xml);
});
