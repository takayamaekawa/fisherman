import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import profile from './data/profile.json';

const imagePath = profile.backgrounds;

const convertBase64 = (svgPath: string): string => {
  let svgContent = fs.readFileSync(svgPath, 'utf-8');

  const imageTagRegex = /<image\s+([^>]*?)xlink:href="([^"]+\.svg)"([^>]*)\/?>/g;

  svgContent = svgContent.replace(imageTagRegex, (match, beforeHref, hrefPath, afterHref) => {
    const fullImagePath = path.resolve(path.dirname(svgPath), hrefPath);
    if (!fs.existsSync(fullImagePath)) {
      console.warn(`⚠️  File not found: ${hrefPath}`);
      return match;
    }

    const svgImage = fs.readFileSync(fullImagePath, 'utf-8');
    const base64 = Buffer.from(svgImage).toString('base64');
    const dataUri = `data:image/svg+xml;base64,${base64}`;

    const cleanedAfterHref = afterHref.replace(/\s*\/\s*$/, '');
    return `<image ${beforeHref}xlink:href="${dataUri}"${cleanedAfterHref}/>`;
  });

  // JSXコメントの除去
  svgContent = svgContent.replace(/\{\/\*.*?\*\/\}/gs, '');

  // 自己閉じタグのスペース修正
  svgContent = svgContent.replace(/\/\s*>/g, '/>');

  const outputPath = 'public/images/backgrounds/main.embedded.svg';
  fs.writeFileSync(outputPath, svgContent, 'utf-8');

  console.log(`✅ Embedded SVG saved to ${outputPath}`);
  return outputPath;
};

const convertSvgToPng = async (svgPath: string) => {
  const outputPathString = path.resolve('output.png'); // これは string 型
  const fullSvgPath = path.resolve(svgPath);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const svgContent = fs.readFileSync(fullSvgPath, 'utf-8');

  const html = `
    <html>
      <body style="margin: 0; padding: 0;">
        ${svgContent}
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load' });

  const elementHandle = await page.$('svg');
  if (!elementHandle) {
    await browser.close(); // ★ エラー時はブラウザを閉じる
    throw new Error('SVG element not found in the loaded page.');
  }

  const clip = await elementHandle.boundingBox();
  if (!clip) {
    await browser.close(); // ★ エラー時はブラウザを閉じる
    throw new Error('Failed to determine SVG bounding box.');
  }

  // ビューポート設定の幅と高さは整数である必要があるため、Math.ceilを使用
  await page.setViewport({
    width: Math.ceil(clip.width),
    height: Math.ceil(clip.height),
  });

  // ★ 型アサーションを追加して修正
  await elementHandle.screenshot({ path: outputPathString as `${string}.png` });

  await browser.close();

  console.log(`✅ Puppeteer による SVG → PNG 変換完了: ${outputPathString}`);
};

// 実行
// imagePath の定義が profile.backgrounds に依存しているので、
// profile.json と profile.backgrounds のキーが存在し、正しいパスを指していることを確認してください。
if (imagePath && fs.existsSync(imagePath)) {
  const embeddedSvgPath = convertBase64(imagePath);
  convertSvgToPng(embeddedSvgPath).catch(err => {
    console.error("SVG to PNG conversion failed:", err);
  });
} else {
  console.error(`⚠️  Error: Main SVG path not found or not defined in profile.json: ${imagePath}`);
}
