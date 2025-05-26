import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';
import tasksData from '../../data/tasks.json';
import TaskList from '../islands/TaskList'; // ★ 作成したアイランドをインポート

export default createRoute(async (c) => {
  // サーバーサイドではデータを読み込むだけ
  const tasks = tasksData.tasks;

  return c.render(
    <>
      <title>{profile.name} - Tasks</title>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header class="text-center">
          <h1 class="text-3xl font-bold">Tasks</h1>
          <p class="mt-2 text-gray-600">業務内容をお届けします。</p> {/* ここも翻訳対象にするなら工夫が必要 */}
        </header>

        <section class="mt-12 text-left">
          {/* ★ TaskList アイランドにデータを渡してレンダリング */}
          <TaskList tasks={tasks} />
        </section>
      </div>
    </>
  );
});
