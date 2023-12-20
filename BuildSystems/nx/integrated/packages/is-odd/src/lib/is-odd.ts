import { isEven } from '@integrated/is-even';

export function isOdd(x: number): boolean {
  return !isEven(x);
}
