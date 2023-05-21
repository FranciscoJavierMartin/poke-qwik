import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class='flex flex-col justify-center items-center'>
      <Slot />
      <Link class='mt-10' href='/'>
        Back to home
      </Link>
    </div>
  );
});
