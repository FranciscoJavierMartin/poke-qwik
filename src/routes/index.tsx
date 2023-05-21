import { component$, $ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {
  const navigateTo = useNavigate();
  const {
    isPokemonVisible,
    nextPokemon,
    pokemonId,
    prevPokemon,
    showBackImage,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame();

  const goToPokemon = $((id: number): void => {
    navigateTo(`/pokemon/${id}/`);
  });

  return (
    <>
      <span class='text-2xl'>Search</span>
      <span class='text-9xl'>{pokemonId.value}</span>
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>
      <div class='mt-2'>
        <button class='btn btn-primary mr-2' onClick$={prevPokemon}>
          Previous
        </button>
        <button class='btn btn-primary mr-2' onClick$={nextPokemon}>
          Next
        </button>
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

export const head: DocumentHead = {
  title: 'Poke Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
