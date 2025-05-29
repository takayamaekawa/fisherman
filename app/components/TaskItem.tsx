import type { TaskInfo, ProcedureItem, StepItem, ImageItem } from '../types/tasks';
import { translate } from '../utils/i18n';
import { generalMessages } from '../locales/translations';
import type { Language } from '../types/common';

type TaskItemProps = TaskInfo & {
  lang: Language;
};

function TaskItem({ id, title, description, procedure, points, image, lang: itemLang }: TaskItemProps) {
  // console.log(`[TaskItem: ${translate(title, itemLang)}] Rendered. Current lang:`, itemLang);

  const translatedDescription = { __html: translate(description, itemLang) };

  return (
    <article id={id} class="mt-12 space-y-4 group relative pt-4 border-t border-gray-700">
      <h3 class="text-2xl font-semibold flex items-center">
        <a href={`#${id}`} class="mr-2 text-xl text-gray-500 hover:text-blue-400 no-underline">🔗</a>
        <span>{translate(title, itemLang)}</span>
      </h3>
      {/* タスク全体のメイン画像 */}
      {image && (
        <img
          src={image}
          alt={translate(title, itemLang)}
          // ★ クラスに w-full と h-auto を追加
          class="my-4 rounded-md w-full max-w-sm h-auto mx-auto"
        />
      )}
      <p class="mt-2 text-gray-300" dangerouslySetInnerHTML={translatedDescription}></p>

      <h4 class="text-lg font-medium mt-4">{translate(generalMessages.taskItemProcedureLabel, itemLang)}:</h4>
      {/* ★ procedure 配列をマップして表示 */}
      <div class="ml-4 space-y-2">
        {procedure.map((item: ProcedureItem, index: number) => {
          if (item.type === 'step') {
            // 型ガードを使って item が StepItem であることを TypeScript に伝える
            const stepItem = item as StepItem;
            return (
              <div key={`${id}-step-${index}`} class="flex items-start">
                <span class="mr-2 text-gray-400">{index + 1}.</span> {/* 番号付け */}
                <div dangerouslySetInnerHTML={{ __html: translate(stepItem.text, itemLang) }}></div>
              </div>
            );
          } else if (item.type === 'image') {
            // 型ガードを使って item が ImageItem であることを TypeScript に伝える
            const imageItem = item as ImageItem;
            return (
              <figure key={`${id}-image-${index}`} class="my-4 text-center">
                <img
                  src={imageItem.path}
                  alt={translate(imageItem.alt, itemLang)}
                  class="rounded-md max-w-full sm:max-w-md mx-auto shadow-lg"
                />
                {/* 必要であればキャプションなども追加可能 */}
                {/* <figcaption class="text-sm text-gray-500 mt-1">{translate(imageItem.alt, itemLang)}</figcaption> */}
              </figure>
            );
          }
          return null; // 未知のtypeの場合は何も表示しない
        })}
      </div>

      {points && points.length > 0 && (
        <>
          <h4 class="text-lg font-medium mt-4">{translate(generalMessages.taskItemPointLabel, itemLang)}:</h4>
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
