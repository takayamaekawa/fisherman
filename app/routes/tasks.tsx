import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';

export default createRoute(async (c) => {
  return c.render(
    <>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <header>
          <h1 class="text-3xl font-bold">Tasks</h1>
          <p class="mt-2 text-gray-600">業務内容をお届けします。</p>
        </header>

        <section class="mt-12 space-y-12 text-left">
        </section>
      </div>
    </>
  );
});
