import {
  component$,
  useComputed$,
  useSignal,
  $,
  useStore,
} from '@builder.io/qwik';
import {
  type DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared/modal/modal';
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
  const isModalVisible = useSignal<boolean>(false);
  const pokemons = usePokemonList();
  const location = useLocation();
  const modalData = useStore({
    id: '',
    name: '',
  });

  const currentOffset = useComputed$(() => {
    return Number(new URLSearchParams(location.url.search).get('offset') || 0);
  });

  const showModal = $((id: string, name: string) => {
    isModalVisible.value = true;
    modalData.id = id;
    modalData.name = name;
  });

  const closeModal = $(() => {
    isModalVisible.value = false;
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
            onClick$={() => showModal(pokemon.id, pokemon.name)}
            class='m-5 flex flex-col justify-center items-center'
          >
            <PokemonImage id={+pokemon.id} isVisible />
            <span class='capitalize'>{pokemon.name}</span>
          </div>
        ))}
      </div>
      <Modal showModal={isModalVisible.value} closeCallback={closeModal} persistent>
        <div q:slot='title'>{modalData.name}</div>
        <div q:slot='content' class='flex flex-col justify-center items-center'>
          <PokemonImage id={+modalData.id} isVisible />
          <span>Asking about</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: 'List SSR',
};
