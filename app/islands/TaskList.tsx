import { usePageLang } from '../hooks/pageLang'; // ★ 新しいフックをインポート
import type { TaskInfo } from '../types/tasks';
import TaskItem from '../components/TaskItem';

const TaskList = ({ tasks }: { tasks: TaskInfo[] }) => {
  const { lang } = usePageLang(); // ★ usePageLang から lang を取得
  // console.log('[TaskList] Rendered. Current lang from usePageLang:', lang);

  return (
    <>
      {tasks.map((task) => (
        <TaskItem
          key={`${task.id}-${lang}`}
          {...task}
          lang={lang} // TaskItem に lang を渡す
        />
      ))}
    </>
  );
};

export default TaskList;
