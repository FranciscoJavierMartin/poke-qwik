import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/Navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get('jwt');

  if (!jwtCookie) {
    redirect(302, '/login');
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <main class='flex flex-col items-center justify-center mt-5'>
        <span class='text-5xl'>Dashboard</span>
        <Slot />
      </main>
    </>
  );
});
