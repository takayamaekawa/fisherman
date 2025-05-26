import { createRoute } from 'honox/factory';
import profile from '../../data/profile.json';

function ContactMethod({
  name,
  href,
  label,
}: {
  name: string;
  href?: string;
  label: string;
}) {
  return (
    <div>
      <p class="text-sm text-gray-500">{name}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-300 hover:text-white transition duration-200"
        >
          {label}
        </a>
      ) : (
        <p class="text-gray-300">{label}</p>
      )}
    </div>
  );
}

export default createRoute(async (c) => {
  return c.render(
    <>
      <title>{profile.name} - Contact</title>
      <div class="mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header class="text-center">
          <h1 class="text-3xl font-bold">Contact</h1>
          <p class="mt-2 text-gray-600">連絡や問い合わせは以下からお願いします。</p>
        </header>
        <section class="mt-8 space-y-4 text-center">
          <ContactMethod
            name="メール"
            href={`mailto:${profile.contact.email}`}
            label={profile.contact.email}
          />
        </section>
      </div>
    </>
  );
});
