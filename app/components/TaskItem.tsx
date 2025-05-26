import type { TaskInfo } from '../types/tasks';
import { translate } from '../utils/i18n';
// import { useLang } from '../hooks/useLang'; // TaskItemではpropsでlangを受け取るので不要な場合も
import type { Language } from '../hooks/useLang'; // ★ Language 型をインポート
// import RubyText from './RubyText'; // RubyText を使う場合はコメントアウトを外す

// TaskItemPropsの型を明示的に定義（TaskInfoとlangプロパティを結合）
type TaskItemProps = TaskInfo & {
  lang: Language;
};

function TaskItem({ id, title, description, steps, points, image, lang: itemLang }: TaskItemProps) {
  console.log(`[TaskItem: ${translate(title, itemLang)}] Rendered. Current lang:`, itemLang);

  const translatedDescription = { __html: translate(description, itemLang) };

  return (
    <article id={id} class="mt-12 space-y-4 group relative pt-4 border-t border-gray-700">
      <h3 class="text-2xl font-semibold flex items-center">
        <a href={`#${id}`} class="mr-2 text-xl text-gray-500 hover:text-blue-400 no-underline">🔗</a>
        <span>{translate(title, itemLang)}</span>
      </h3>
      {image && <img src={image} alt={translate(title, itemLang)} class="my-4 rounded-md max-w-sm mx-auto" />}
      <p class="mt-2 text-gray-300" dangerouslySetInnerHTML={translatedDescription}></p>
      <h4 class="text-lg font-medium mt-4">手順:</h4>
      <ul class="list-decimal list-inside text-gray-400 ml-4 space-y-1">
        {steps.map((step, index) => (
          <li key={`${id}-step-${index}`} dangerouslySetInnerHTML={{ __html: translate(step, itemLang) }}></li>
        ))}
      </ul>
      {points && points.length > 0 && (
        <>
          <h4 class="text-lg font-medium mt-4">ポイント:</h4>
          <ul class="list-disc list-inside text-gray-400 ml-4 space-y-1">
            {points.map((point, index) => (
              <li key={`${id}-point-${index}`} dangerouslySetInnerHTML={{ __html: translate(point, itemLang) }}></li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

export default TaskItem;
