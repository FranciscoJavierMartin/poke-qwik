import type { PokemonListResponse } from '~/interfaces/pokemon-list.response';
import type { SmallPokemon } from '~/interfaces/small-pokemon';

export const getSmallPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemon[]> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  return ((await resp.json()) as PokemonListResponse).results.map(
    (pokemon) => ({
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
    })
  );
};
