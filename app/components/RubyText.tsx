import { fishDictionary } from '../locales/translations';

// 例: RubyText コンポーネント (簡易版)
function RubyText({ text, lang }: { text: string; lang: string }) {
  if (lang !== 'ja') {
    return <>{text}</>; // 日本語以外はそのまま表示
  }

  // 簡易的な実装: 辞書にある魚の名前を探してルビを振る
  let processedText = text;
  for (const [jaName, enName] of Object.entries(fishDictionary)) {
    processedText = processedText.replace(
      new RegExp(jaName, 'g'),
      `<ruby><span class="math-inline">\{jaName\}<rt\></span>{enName}</rt></ruby>`
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
}

export default RubyText;
