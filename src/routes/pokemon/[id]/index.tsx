import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';

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
  usePokemonId();
  const pokemonGame = useContext(PokemonGameContext);

  return (
    <>
      <span class='text-5xl'>Pokemon {pokemonGame.pokemonId}</span>
      <PokemonImage
        id={pokemonGame.pokemonId}
        isVisible={pokemonGame.isPokemonVisible}
      />
    </>
  );
});
