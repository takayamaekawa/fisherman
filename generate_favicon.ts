import puppeteer from 'puppeteer';
import path from 'path';

// 個々の魚SVGファイル名
const FISH_SVG_FILES = [
  'kkrn_icon_sakana_1.svg',
  'kkrn_icon_sakana_2.svg',
  'kkrn_icon_sakana_3.svg',
  'kkrn_icon_sakana_4.svg',
  'kkrn_icon_sakana_5.svg',
  'kkrn_icon_sakana_6.svg',
];

// 魚SVGファイルが格納されているディレクトリ (publicからの相対パス)
const FISH_SVG_SOURCE_DIR = 'public/images/backgrounds';

// 出力するPNGファイル名とサイズ
const OUTPUT_PNG_FILENAME = 'favicon_design.png'; // このPNGを元に.icoファイルを作成できます
const FAVICON_CANVAS_SIZE = 128; // favicon用PNGのサイズ (例: 128x128px)

// SVGデザインのパラメータ
const CANVAS_CENTER_X = FAVICON_CANVAS_SIZE / 2;
const CANVAS_CENTER_Y = FAVICON_CANVAS_SIZE / 2;
const NUM_FISH = FISH_SVG_FILES.length;
const FISH_ICON_DISPLAY_SIZE = FAVICON_CANVAS_SIZE * 0.35; // ファビコン内での各魚の表示サイズ
const CIRCLE_RADIUS = FAVICON_CANVAS_SIZE * 0.3; // 魚の中心を配置する円の半径

/**
 * ファビコンデザイン用のSVGコンテンツ文字列を生成します。
 * 6匹の魚が円形に、頭を中央に向けて配置されます。
 */
function generateFaviconSvgContent(): string {
  let imageElementsSvg = '';

  for (let i = 0; i < NUM_FISH; i++) {
    // 円周上の角度を計算 (ラジアン)
    // Math.PI / 2 を引いて、最初の魚が真上 (90度) に来るように調整
    const angleRad = (i * 2 * Math.PI) / NUM_FISH - (Math.PI / 2);

    // 魚のアイコンの中心座標
    const fishCenterX = CANVAS_CENTER_X + CIRCLE_RADIUS * Math.cos(angleRad);
    const fishCenterY = CANVAS_CENTER_Y + CIRCLE_RADIUS * Math.sin(angleRad);

    // <image> タグの左上のx, y座標
    const imageX = fishCenterX - FISH_ICON_DISPLAY_SIZE / 2;
    const imageY = fishCenterY - FISH_ICON_DISPLAY_SIZE / 2;

    // 魚の回転角度 (度)
    // 各魚が円の中心を向くように、(円周上の角度 + 90度) で回転させる
    // (魚SVGがデフォルトで右向き (0度) と仮定)
    const rotationDeg = (angleRad * 180 / Math.PI) + 90;

    // Puppeteerがアクセスできるように、個々の魚SVGへの絶対ファイルパスからfile:/// URLを生成
    const fishSvgFilePath = path.resolve(process.cwd(), FISH_SVG_SOURCE_DIR, FISH_SVG_FILES[i]);
    const fishSvgFileUrl = `file://${fishSvgFilePath}`;

    // xlink:href には、Puppeteerが解決できるパスを指定する必要があります。
    // convertBase64 のようにData URIに埋め込む方法も堅牢ですが、
    // ここでは file:/// URL を使う例を示します。
    // もし file:/// URLで問題が出る場合は、各魚SVGをData URIに変換する処理が必要です。

    imageElementsSvg += `
      <image
        xlink:href="${fishSvgFileUrl}"
        x="${imageX.toFixed(2)}"
        y="${imageY.toFixed(2)}"
        width="${FISH_ICON_DISPLAY_SIZE.toFixed(2)}"
        height="${FISH_ICON_DISPLAY_SIZE.toFixed(2)}"
        transform="rotate(${rotationDeg.toFixed(2)}, ${fishCenterX.toFixed(2)}, ${fishCenterY.toFixed(2)})"
      />`;
  }

  // SVG全体のコンテンツ
  return `
    <svg
      width="${FAVICON_CANVAS_SIZE}"
      height="${FAVICON_CANVAS_SIZE}"
      viewBox="0 0 ${FAVICON_CANVAS_SIZE} ${FAVICON_CANVAS_SIZE}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      {/* 背景を透明にするか、色をつけるか選択できます */}
      {/* <rect width="100%" height="100%" fill="white"/> */} {/* 例: 白背景 */}
      
      <g>
        ${imageElementsSvg}
      </g>
    </svg>
  `;
}

/**
 * 生成されたSVGデザインを元にPNGファイルを作成します。
 */
async function createFaviconPngFromSvg() {
  console.log('Generating favicon SVG content...');
  const svgContent = generateFaviconSvgContent();

  // デバッグ用に生成したSVGをファイルに保存（任意）
  // fs.writeFileSync('debug_favicon_design.svg', svgContent, 'utf-8');
  // console.log('Debug SVG saved to debug_favicon_design.svg');

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({
    width: FAVICON_CANVAS_SIZE,
    height: FAVICON_CANVAS_SIZE,
  });

  console.log('Setting page content with generated SVG...');
  // SVGコンテンツをData URIとしてページにロードするのが最も安定します
  const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
  await page.goto(svgDataUri, { waitUntil: 'networkidle0' }); // networkidle0はローカルSVGならloadでも十分かも

  console.log('Locating SVG element on the page...');
  const svgElementHandle = await page.$('svg');
  if (!svgElementHandle) {
    await browser.close();
    throw new Error('SVG element could not be found on the page after loading Data URI.');
  }

  const outputPath = path.resolve(OUTPUT_PNG_FILENAME);
  console.log(`Taking screenshot and saving to: ${outputPath}`);

  try {
    await svgElementHandle.screenshot({
      path: outputPath as `${string}.png`, // 型アサーション
      omitBackground: true, // SVG自体に背景がなければPNGも背景透過に
    });
    console.log(`✅ Favicon PNG successfully generated: ${outputPath}`);
  } catch (error) {
    console.error('Error during screenshot operation:', error);
    await browser.close();
    throw error; // エラーを再スロー
  }

  await browser.close();
  console.log('Puppeteer browser closed.');
}

// スクリプト実行
createFaviconPngFromSvg().catch(err => {
  console.error('Failed to create favicon PNG:', err);
  process.exit(1); // エラーで終了
});
