import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';

export default createRoute(async (c) => {
  return c.render(
    <>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h1 class="text-3xl font-bold">Home</h1>
        <p class="text-xl text-gray-400 mt-2">{profile.title}</p>
        <p class="mt-6 text-lg text-gray-300">
          {profile.comment}
        </p>
        <p class="mt-4 text-gray-400">

        </p>
        <div class="mt-6 space-x-4">
          <a href="/staff" class="text-blue-400 underline hover:text-blue-300">staff</a>
          <a href="/tasks" class="text-blue-400 underline hover:text-blue-300">tasks</a>
        </div>
      </div>
    </>
  );
});

