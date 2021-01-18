// This is an efficient, but not really general way of compating objects
// It doesn't work in every case, e.g. object which contain methods
type AreObjectsEqual = <T>(objA: T, objB: T) => boolean;
export const areObjectsEqual: AreObjectsEqual = (objA, objB) => JSON.stringify(objA) === JSON.stringify(objB);
