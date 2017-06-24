export const shuffle = (array, rng) => {
  let i = array.length, j, swap;
    if (!rng) rng = Math;
  while (--i) {
    j = rng.random() * (i + 1) | 0;
    swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}
