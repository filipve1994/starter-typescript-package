import { expect, it } from 'vitest';
import { testAdd } from '@/functions';

it('1 + 1', () => {
  expect(testAdd(1, 1)).toBe(2);
});
