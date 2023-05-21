import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, '/');
  } else if (id <= 0) {
    redirect(301, '/');
  } else if (id > 1010) {
    redirect(301, '/');
  }

  return id;
});

export default component$(() => {
  const id = usePokemonId();

  const {
    isPokemonVisible,
    pokemonId,
    toggleFromBack,
    toggleVisible,
    setPokemonId,
  } = usePokemonGame();

  useVisibleTask$(({ track }) => {
    track(() => id);
    setPokemonId(id.value);
  });

  return (
    <>
      <span class='text-5xl'>Pokemon {pokemonId.value}</span>
      <PokemonImage id={pokemonId.value} isVisible={isPokemonVisible.value} />
      <div class='mt-2'>
        <button class='btn btn-primary mr-2' onClick$={toggleFromBack}>
          Flip
        </button>
        <button class='btn btn-primary mr-2' onClick$={toggleVisible}>
          {isPokemonVisible.value ? 'Hide' : 'Reveal'}
        </button>
      </div>
    </>
  );
});
