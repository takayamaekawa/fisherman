import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import profile from './data/profile.json';
import pngToIco from 'png-to-ico';

// --- 共通ヘルパー関数 ---
/**
 * 指定されたSVGファイルを読み込み、Base64エンコードされたData URIとして返します。
 * @param filePath SVGファイルへのパス
 * @returns Data URI文字列、またはエラー時はnull
 */
function getSvgFileAsDataUri(filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found for Base64 conversion: ${filePath}`);
    return null;
  }
  try {
    const svgContent = fs.readFileSync(filePath, 'utf-8');
    const base64 = Buffer.from(svgContent).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    console.error(`Error reading or encoding SVG file ${filePath}:`, error);
    return null;
  }
}

/**
 * SVG文字列を受け取り、Puppeteerを使ってPNGに変換します。
 * @param svgString SVGのXML文字列
 * @param outputPngPath 出力するPNGファイルのパス
 * @param pngWidth PNGの幅
 * @param pngHeight PNGの高さ
 */
async function convertSvgStringToPng(
  svgString: string,
  outputPngPath: string,
  pngWidth: number,
  pngHeight: number
): Promise<void> {
  console.log(`Launching Puppeteer for SVG string to PNG (output: ${outputPngPath})...`);
  const browser = await puppeteer.launch({ headless: true }); // headless: true に修正済み
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: pngWidth, height: pngHeight });

    const svgDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    console.log(`Navigating to SVG data URI (length: ${svgDataUri.length})...`);
    await page.goto(svgDataUri, { waitUntil: 'load' });

    console.log('Locating SVG element on the page...');
    const elementHandle = await page.$('svg');
    if (!elementHandle) {
      throw new Error('SVG element could not be found on the page.');
    }

    const resolvedOutputPath = path.resolve(outputPngPath);
    console.log(`Taking screenshot and saving to: ${resolvedOutputPath}`);
    await elementHandle.screenshot({
      path: resolvedOutputPath as `${string}.png`,
      omitBackground: true, // SVG背景が透明ならPNGも透過
    });
    console.log(`✅ PNG successfully generated: ${resolvedOutputPath}`);
  } catch (error) {
    console.error('Error during SVG to PNG conversion:', error);
    throw error; // エラーを再スローして呼び出し元でキャッチできるようにする
  } finally {
    await browser.close();
    console.log('Puppeteer closed for SVG string to PNG conversion.');
  }
}


// --- ファビコン生成ロジック ---
const FAVICON_FISH_SVG_FILES = [
  'kkrn_icon_sakana_1.svg', 'kkrn_icon_sakana_2.svg', 'kkrn_icon_sakana_3.svg',
  'kkrn_icon_sakana_4.svg', 'kkrn_icon_sakana_5.svg',
];
const FAVICON_FISH_SVG_SOURCE_DIR = 'public/images/backgrounds'; // 個々の魚SVGがあるディレクトリ
const FAVICON_OUTPUT_ICO_FILENAME = 'public/favicon.ico';
const FAVICON_OUTPUT_PNG_FILENAME = 'public/favicon.png';
const FAVICON_OUTPUT_SVG_FILENAME = 'public/favicon.svg';
const FAVICON_CANVAS_SIZE = 128;
const FAVICON_CX = FAVICON_CANVAS_SIZE / 2;
const FAVICON_CY = FAVICON_CANVAS_SIZE / 2;
const FAVICON_NUM_FISH = FAVICON_FISH_SVG_FILES.length;
const FAVICON_FISH_DISPLAY_SIZE = FAVICON_CANVAS_SIZE * 0.35;
const FAVICON_CIRCLE_RADIUS = FAVICON_CANVAS_SIZE * 0.3;

function generateFaviconLayoutSvgString(): string {
  let imageElementsSvg = '';
  for (let i = 0; i < FAVICON_NUM_FISH; i++) {
    const angleRad = (i * 2 * Math.PI) / FAVICON_NUM_FISH - (Math.PI / 2); // 最初の魚が真上
    const fishCenterX = FAVICON_CX + FAVICON_CIRCLE_RADIUS * Math.cos(angleRad);
    const fishCenterY = FAVICON_CY + FAVICON_CIRCLE_RADIUS * Math.sin(angleRad);
    const imageX = fishCenterX - FAVICON_FISH_DISPLAY_SIZE / 2;
    const imageY = fishCenterY - FAVICON_FISH_DISPLAY_SIZE / 2;
    const rotationDeg = (angleRad * 180 / Math.PI) + 90;

    const fishSvgFilePath = path.resolve(process.cwd(), FAVICON_FISH_SVG_SOURCE_DIR, FAVICON_FISH_SVG_FILES[i]);
    const fishSvgDataUri = getSvgFileAsDataUri(fishSvgFilePath); // ★ Base64 Data URIを取得

    if (!fishSvgDataUri) {
      console.warn(`Skipping fish ${FAVICON_FISH_SVG_FILES[i]} in favicon due to loading error.`);
      continue;
    }

    imageElementsSvg += `
      <image
        xlink:href="${fishSvgDataUri}" x="${imageX.toFixed(2)}"
        y="${imageY.toFixed(2)}"
        width="${FAVICON_FISH_DISPLAY_SIZE.toFixed(2)}"
        height="${FAVICON_FISH_DISPLAY_SIZE.toFixed(2)}"
        transform="rotate(${rotationDeg.toFixed(2)}, ${fishCenterX.toFixed(2)}, ${fishCenterY.toFixed(2)})"
      />`;
  }

  return `
    <svg
      width="${FAVICON_CANVAS_SIZE}"
      height="${FAVICON_CANVAS_SIZE}"
      viewBox="0 0 ${FAVICON_CANVAS_SIZE} ${FAVICON_CANVAS_SIZE}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g>${imageElementsSvg}</g>
    </svg>`;
}

async function generateFavicon(): Promise<void> {
  console.log('--- Generating Favicon ---');
  const faviconSvgString = generateFaviconLayoutSvgString();

  // (任意) 生成した自己完結型SVGをデバッグ用に保存
  fs.writeFileSync(FAVICON_OUTPUT_SVG_FILENAME, faviconSvgString, 'utf-8');
  console.log(`Debug favicon SVG (with embedded images) saved to ${FAVICON_OUTPUT_SVG_FILENAME}`);

  const pngOutputPath = path.resolve(FAVICON_OUTPUT_PNG_FILENAME);
  await convertSvgStringToPng(
    faviconSvgString,
    FAVICON_OUTPUT_PNG_FILENAME, // path.resolveはconvertSvgStringToPng内で行う想定
    FAVICON_CANVAS_SIZE,
    FAVICON_CANVAS_SIZE
  );

  // ★ PNGからICOへの変換処理を追加
  console.log(`\n--- Converting ${path.basename(pngOutputPath)} to ICO ---`);
  if (fs.existsSync(pngOutputPath)) {
    try {
      const icoBuffer = await pngToIco(pngOutputPath); // PNGファイルのパスを渡す
      const icoOutputPathResolved = path.resolve(FAVICON_OUTPUT_ICO_FILENAME);
      fs.writeFileSync(icoOutputPathResolved, icoBuffer);
      console.log(`✅ Favicon ICO successfully generated: ${icoOutputPathResolved}`);
    } catch (error) {
      console.error('Error during PNG to ICO conversion:', error);
      // ICO変換の失敗は全体の処理を停止させない場合は、ここではエラーをthrowしない
    }
  } else {
    console.warn(`⚠️ PNG file not found at ${pngOutputPath}, skipping ICO conversion.`);
  }
}


// --- 背景画像生成ロジック (元backgrounds.tsより) ---
const MAIN_SVG_FOR_BACKGROUND_PATH = profile.backgrounds as string | undefined; // profile.jsonの 'backgrounds' キー
const EMBEDDED_MAIN_SVG_OUTPUT_PATH = 'public/backgrounds.svg';
const FINAL_BACKGROUND_PNG_OUTPUT_PATH = 'public/backgrounds.png';

/**
 * 既存のSVGファイル内の<image xlink:href="*.svg"> を探し、
 * リンク先のSVGをBase64 Data URIとして埋め込みます。
 * @param sourceSvgPath 元となるSVGファイルのパス
 * @param outputEmbeddedSvgPath Data URI埋め込み後のSVGを保存するパス
 * @returns 埋め込み処理後のSVGファイルのパス。変更がなければ元のパス。
 */
function embedChildrenSvgsInMainSvg(sourceSvgPath: string, outputEmbeddedSvgPath: string): string {
  if (!fs.existsSync(sourceSvgPath)) {
    console.error(`⚠️ Main background SVG source file not found: ${sourceSvgPath}`);
    return sourceSvgPath; // 元のパスを返して処理を継続させるか、エラーを投げるか
  }
  console.log(`Processing main background SVG: ${sourceSvgPath} to embed its children...`);
  let svgContent = fs.readFileSync(sourceSvgPath, 'utf-8');
  // xlink:href の値が .svg で終わるものを対象とする正規表現
  const imageTagRegex = /<image\s+([^>]*?)xlink:href="([^"]+\.svg)"([^>]*)\/?>/gi;
  let changesMade = false;

  svgContent = svgContent.replace(imageTagRegex, (match, beforeHref, hrefPath, afterHref) => {
    // hrefPath は sourceSvgPath からの相対パスとして解釈されることが多い
    const fullImagePath = path.resolve(path.dirname(sourceSvgPath), hrefPath);
    const dataUri = getSvgFileAsDataUri(fullImagePath); // 共通ヘルパーを使用

    if (!dataUri) {
      console.warn(`⚠️ Child SVG not found or could not be processed for embedding: ${hrefPath} (resolved to ${fullImagePath})`);
      return match; // 埋め込み失敗時は元のタグを返す
    }

    console.log(`Embedding ${hrefPath} into ${path.basename(sourceSvgPath)}.`);
    changesMade = true;
    const cleanedAfterHref = afterHref.replace(/\s*\/\s*$/, ''); // 自己閉じタグの前の余分なスラッシュやスペースを整理
    return `<image ${beforeHref}xlink:href="${dataUri}"${cleanedAfterHref}/>`;
  });

  // 元のスクリプトにあったクリーンアップ処理
  svgContent = svgContent.replace(/\{\/\*.*?\*\/\}/gs, ''); // JSXコメント (もしあれば)
  svgContent = svgContent.replace(/\/\s*>/g, '/>');     // 自己閉じタグのスペース

  if (changesMade) {
    fs.writeFileSync(outputEmbeddedSvgPath, svgContent, 'utf-8');
    console.log(`✅ Embedded main background SVG saved to ${outputEmbeddedSvgPath}`);
    return outputEmbeddedSvgPath;
  } else {
    console.log(`No child SVGs found to embed in ${sourceSvgPath}. Using original path.`);
    return sourceSvgPath; // 変更がなければ元のパスを返す
  }
}

async function generateBackgroundImages(): Promise<void> {
  console.log('\n--- Generating Background Pattern Image ---');
  if (!MAIN_SVG_FOR_BACKGROUND_PATH) {
    console.log('Path to main background SVG (profile.backgrounds) is not defined in profile.json. Skipping background image generation.');
    return;
  }

  const embeddedSvgPath = embedChildrenSvgsInMainSvg(
    MAIN_SVG_FOR_BACKGROUND_PATH,
    EMBEDDED_MAIN_SVG_OUTPUT_PATH
  );

  // SVGからPNGへの変換 (PuppeteerのビューポートはSVGのサイズに合わせる)
  if (!fs.existsSync(embeddedSvgPath)) {
    console.error(`⚠️ Embedded background SVG not found: ${embeddedSvgPath}`);
    return;
  }
  const svgToConvertContent = fs.readFileSync(embeddedSvgPath, 'utf-8');

  // SVGのwidth/height属性からサイズを取得する試み (より堅牢なのはPuppeteerでboundingBox)
  let svgWidth = 360; // デフォルト値 (元のmain.svgのpatternサイズ)
  let svgHeight = 240; // デフォルト値

  const widthMatch = svgToConvertContent.match(/<svg[^>]+width="(\d+)"/);
  const heightMatch = svgToConvertContent.match(/<svg[^>]+height="(\d+)"/);
  if (widthMatch && widthMatch[1]) svgWidth = parseInt(widthMatch[1], 10);
  if (heightMatch && heightMatch[1]) svgHeight = parseInt(heightMatch[1], 10);

  if (svgWidth === 0 || svgHeight === 0) {
    console.warn(`Could not determine valid dimensions from SVG attributes (w:${svgWidth}, h:${svgHeight}). Using defaults or screenshot may fail.`);
    // ここでPuppeteerのboundingBoxを使う方が確実（以前のconvertSvgToPngのように）
    // 簡単のため、ここでは属性値を優先。必要ならboundingBoxロジックをここに移植。
  }

  await convertSvgStringToPng(
    svgToConvertContent,
    FINAL_BACKGROUND_PNG_OUTPUT_PATH,
    svgWidth,
    svgHeight
  );
}

// --- メイン実行ブロック ---
async function runImageGeneration() {
  try {
    await generateFavicon();
    await generateBackgroundImages();
    console.log('\n🎉 All image generation tasks completed successfully.');
  } catch (error) {
    console.error('☠️ An error occurred during image generation:', error);
    process.exit(1);
  }
}

runImageGeneration();
