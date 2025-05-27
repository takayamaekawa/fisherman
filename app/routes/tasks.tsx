import { createRoute } from 'honox/factory';
import tasksData from '../../data/tasks.json';
import TaskList from '../islands/TaskList';
import CommonHeader from '../islands/CommonHeader';
import TableOfContents from '../islands/TableOfContents';
import type { TaskInfo } from '../types/tasks';
import { generalMessages } from '../locales/translations';

// tasksData.tasks が TaskInfo[] 型であることを明示
const typedTasksData = tasksData.tasks as TaskInfo[];

export default createRoute(async (c) => {
  // ページタイトルは RootLayoutIsland または _renderer.tsx で設定
  // c.set('pageTitleKey', 'tasksTitle'); // もしgeneralMessagesのキーを渡すなら

  return c.render(
    <>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <CommonHeader
          titleContent={generalMessages.tasksTitle}
          descriptionContent={generalMessages.tasksDescription}
        />

        {/* ★ 目次を追加し、タスクのidとtitleを渡す */}
        <TableOfContents tasks={typedTasksData.map(task => ({ id: task.id, title: task.title }))} />

        <section class="mt-8 text-left"> {/* 目次との間隔を調整する場合は mt-8 などを調整 */}
          <TaskList tasks={typedTasksData} />
        </section>
      </div>
    </>
  );
});
