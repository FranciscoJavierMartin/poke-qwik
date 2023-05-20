import { component$, useComputed$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';

export const usePokemonList = routeLoader$(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || 0);

    if (offset < 0 || offset > 1010) {
      redirect(301, pathname);
    }

    return getSmallPokemons(offset);
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$(() => {
    return Number(new URLSearchParams(location.url.search).get('offset') || 0);
  });

  return (
    <>
      <div class='flex flex-col'>
        <span class='my-5 text-5xl'>Status</span>
        <span>Current offset: {currentOffset}</span>
        <span>Is loading? {location.isNavigating ? 'Yes' : 'No'}</span>
      </div>
      <div class='mt-10'>
        <Link
          class='btn btn-primary mr-2'
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
        >
          Previous
        </Link>
        <Link
          class='btn btn-primary mr-2'
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
        >
          Next
        </Link>
      </div>
      <div class='grid grid-cols-6 mt-5'>
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.id}
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
  title: 'List SSR',
};
