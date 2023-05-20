import { component$, $, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import {
  PokemonGameContext,
  type PokemonGameState,
} from '~/context/pokemon/pokemon-game.context';

export default component$(() => {
  const navigateTo = useNavigate();
  const pokemonGame = useContext<PokemonGameState>(PokemonGameContext);

  const changePokemonId = $((value: number): void => {
    if (pokemonGame.pokemonId + value > 0) {
      pokemonGame.pokemonId += value;
    }
  });

  const goToPokemon = $((): void => {
    navigateTo(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class='text-2xl'>Search</span>
      <span class='text-9xl'>{pokemonGame.pokemonId}</span>
      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>
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
          onClick$={() =>
            (pokemonGame.showBackImage = !pokemonGame.showBackImage)
          }
        >
          Flip
        </button>
        <button
          class='btn btn-primary mr-2'
          onClick$={() =>
            (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
          }
        >
          {pokemonGame.isPokemonVisible ? 'Hide' : 'Reveal'}
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
