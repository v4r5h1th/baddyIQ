let counter = 0;

export function generateId(prefix = 'id'): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`;
}

// Small seeded PRNG so mock data is stable across renders/reloads.
export function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function pick<T>(arr: readonly T[], rand: () => number = Math.random): T {
  return arr[Math.floor(rand() * arr.length)];
}

export function randomInt(min: number, max: number, rand: () => number = Math.random): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
