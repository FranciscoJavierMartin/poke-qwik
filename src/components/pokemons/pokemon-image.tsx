import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage, isVisible = false }: Props) => {
    const imageLoaded = useSignal<boolean>(false);

    const imageUrl = backImage
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
      console.log('Hello');
    });

    return (
      <div
        class='flex items-center justify-center'
        style={{ with: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Loading...</span>}
        <img
          src={imageUrl}
          alt='Pokemon sprite'
          width={size}
          height={size}
          onLoad$={() => {
            setTimeout(() => (imageLoaded.value = true), 500);
          }}
          class={[
            { hidden: !imageLoaded.value, 'brightness-0': !isVisible },
            'transition-all',
          ]}
        />
      </div>
    );
  }
);
