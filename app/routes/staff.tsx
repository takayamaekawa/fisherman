import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';

export default createRoute(async (c) => {
  return c.render(
    <>
      <title>{profile.name} - Staff</title>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header class="text-center">
          <h1 class="text-3xl font-bold">Staff</h1>
          <p class="mt-2 text-gray-600">スタッフ情報をお届けします。</p>
        </header>
        <section class="mt-8 space-y-4">
        </section>
      </div>
    </>
  );
});
