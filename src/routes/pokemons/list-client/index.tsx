import {
  component$,
  useOnDocument,
  useStore,
  useTask$,
  $,
  /*useVisibleTask$,*/
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import type { SmallPokemon } from '~/interfaces/small-pokemon';

interface PokemonPageState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);
  //   pokemonState.pokemons = await getSmallPokemons(
  //     pokemonState.currentPage * 10
  //   );
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 30, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight + 200;

      if (currentScroll >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class='flex flex-col'>
        <span class='my-5 text-5xl'>Status</span>
        <span>Current offset: {pokemonState.currentPage}</span>
        {/* <span>Is loading? {location.isNavigating ? 'Yes' : 'No'}</span> */}
      </div>
      {/* <div class='mt-10'>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => pokemonState.currentPage--}
        >
          Previous
        </button>
        <button
          class='btn btn-primary mr-2'
          onClick$={() => pokemonState.currentPage++}
        >
          Next
        </button>
      </div> */}
      <div class='grid sm:grid-cols-2 md:grid-cols-5 grid-cols-7 mt-5'>
        {pokemonState.pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            class='m-5 flex flex-col justify-center items-center'
          >
            <PokemonImage id={+pokemon.id} isVisible />
            <span class='capitalize'>{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'List Client',
};
