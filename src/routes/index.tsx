import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const isPokemonVisible = useSignal<boolean>(false);

  const changePokemonId = $((value: number): void => {
    if (pokemonId.value + value > 0) {
      pokemonId.value += value;
    }
  });

  return (
    <>
      <span class='text-2xl'>Search</span>
      <span class='text-9xl'>{pokemonId}</span>
      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />
      <div class='mt-2'>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => changePokemonId(-1)}
        >
          Previous
        </button>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => changePokemonId(1)}
        >
          Next
        </button>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => (showBackImage.value = !showBackImage.value)}
        >
          Flip
        </button>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => (isPokemonVisible.value = !isPokemonVisible.value)}
        >
          {isPokemonVisible.value ? 'Hide' : 'Reveal'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Poke Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
