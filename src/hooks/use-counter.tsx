import { useSignal, $, useComputed$ } from '@builder.io/qwik';

export const useCounter = (initialValue: number) => {
  const counter = useSignal<number>(initialValue);

  const increaseCounter = $(() => {
    counter.value++;
  });

  const decreaseCounter = $(() => {
    counter.value--;
  });

  return {
    counter: useComputed$<number>(() => counter.value),
    increase: increaseCounter,
    decrease: decreaseCounter,
  };
};
