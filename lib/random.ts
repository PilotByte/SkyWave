/**
 * Shuffles an array based on a seed value.
 * @param array - The array to be shuffled.
 * @param seed - The initial seed value for the shuffle.
 * @returns The shuffled array.
 */
export function shuffle<T>(array: T[], seed: number): T[] {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

/**
 * Generates a pseudo-random number based on a seed value.
 * @param seed - The seed value for the pseudo-random number generator.
 * @returns A pseudo-random number between 0 and 1.
 */
function random(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
