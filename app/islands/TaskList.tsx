import { useLang } from '../hooks/useLang';
import { translate } from '../utils/i18n';
import type { TaskInfo } from '../types/tasks';
import TaskItem from '../components/TaskItem';

// TaskList アイランドコンポーネント
const TaskList = ({ tasks }: { tasks: TaskInfo[] }) => {
  const { lang } = useLang();
  console.log('[TaskList] Rendered. Current lang:', lang);

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={`${task.id}-${lang}`} // lang を含めてキーをユニークに
          {...task}
          lang={lang} // ★ lang プロパティを TaskItem に渡す
        />
      ))}
    </>
  );
};

export default TaskList;
