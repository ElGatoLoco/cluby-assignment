import { areObjectsEqual } from '../are-objects-equal';

test('empty objects equal', () => {
  const objA = {};
  const objB = {};
  expect(areObjectsEqual(objA, objB)).toEqual(true);
});

test('non-empty objects equal', () => {
  const objA = { a: 1 };
  const objB = { a: 1 };
  expect(areObjectsEqual(objA, objB)).toEqual(true);
});

test('empty objects equal', () => {
  const objA = {};
  const objB = {};
  expect(areObjectsEqual(objA, objB)).toEqual(true);
});

test('non-empty objects equal', () => {
  const objA = { a: 1 };
  const objB = { a: 1 };
  expect(areObjectsEqual(objA, objB)).toEqual(true);
});

test('object are different', () => {
  const objA = { a: 1 };
  const objB = { a: 2 };
  expect(areObjectsEqual(objA, objB)).toEqual(false);
});
