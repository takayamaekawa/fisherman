import { usePageLang } from '../hooks/pageLang';
import { translate } from '../utils/i18n';
import type { TaskInfo } from '../types/tasks';
import { generalMessages } from '../locales/translations';

// TableOfContentsコンポーネントが必要とするTaskInfoのプロパティを定義
type TocTaskItem = Pick<TaskInfo, 'id' | 'title'>;

type TableOfContentsProps = {
  tasks: TocTaskItem[]; // タスクの配列（idとtitleを含む）
};

const TableOfContents = ({ tasks }: TableOfContentsProps) => {
  const { lang } = usePageLang();
  console.log('[TableOfContents Island] Rendered. Current lang:', lang);

  if (!tasks || tasks.length === 0) {
    return null; // タスクがない場合は何も表示しない
  }

  return (
    <nav class="mb-10 p-6 bg-gray-700/50 border border-gray-600 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-100">
        {translate(generalMessages.tableOfContentsTitle, lang)}
      </h2>
      <ul class="list-decimal list-inside space-y-1 marker:text-gray-400">
        {tasks.map(task => (
          <li key={task.id} class="text-lg">
            <a
              href={`#${task.id}`} // TaskItemのarticleタグのidへリンク
              class="text-blue-300 hover:text-blue-200 hover:underline"
            >
              {translate(task.title, lang)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
