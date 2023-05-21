import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  PokemonListContext,
  type PokemonListState,
} from './pokemon-list.context';
import {
  PokemonGameContext,
  type PokemonGameState,
} from './pokemon-game.context';
import { POKEMON_GAME_KEY } from '~/constants/localStorage';

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: true,
    showBackImage: false,
  });

  useContextProvider(PokemonGameContext, pokemonGame);

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    if (localStorage.getItem(POKEMON_GAME_KEY)) {
      const {
        isPokemonVisible = true,
        pokemonId = 1,
        showBackImage = false,
      } = JSON.parse(
        localStorage.getItem(POKEMON_GAME_KEY)!
      ) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem(POKEMON_GAME_KEY, JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
