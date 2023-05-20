import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/Navbar/navbar';
import styles from './styles.css?inline';
import { PokemonProvider } from '~/context/pokemon/pokemon-provider';

export default component$(() => {
  useStyles$(styles);

  return (
    <PokemonProvider>
      <Navbar />
      <main class='flex flex-col items-center justify-center'>
        <Slot />
      </main>
    </PokemonProvider>
  );
});
