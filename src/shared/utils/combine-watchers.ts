import { StrictEffect } from 'redux-saga/effects';

export type Watcher = () => Generator<StrictEffect>;

export const combineWatchers = (...args: (Watcher | Watcher[])[]): Generator[] => {
  return args.flat().map((watcher: Watcher) => {
    try {
      return watcher();
    } catch (e) {
      const error = new Error('It seems that a watcher is not a function.');
      error.stack = e.stack;

      throw error;
    }
  });
};
