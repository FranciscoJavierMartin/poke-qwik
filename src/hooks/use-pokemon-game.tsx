import { useComputed$, useContext, $ } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context/pokemon/pokemon-game.context';

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number): void => {
    if (pokemonGame.pokemonId + value > 0) {
      pokemonGame.pokemonId += value;
    }
  });

  const setPokemonId = $((value: number): void => {
    if (0 < value && value <= 1010) {
      pokemonGame.pokemonId = value;
    }
  });

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    nextPokemon: $(() => changePokemonId(1)),
    prevPokemon: $(() => changePokemonId(-1)),
    setPokemonId,
    toggleFromBack,
    toggleVisible,
  };
};
