import { getEntitiesWatcher, postUpdatedEntitiesWatcher } from '../../../features/entities/redux/sagas';
import { combineWatchers } from '../combine-watchers';

const isGenerator = <T>(fn: T) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  typeof fn[Symbol.iterator] === 'function' && typeof fn['next'] === 'function' && typeof fn['throw'] === 'function';

test('valid generators provided to combineWatchers', () => {
  const watchers = combineWatchers(getEntitiesWatcher, postUpdatedEntitiesWatcher);

  expect(watchers.every(isGenerator));
});

test('valid watchers array provided to combineWatchers', () => {
  const watchers = combineWatchers([getEntitiesWatcher, postUpdatedEntitiesWatcher]);

  expect(watchers.every(isGenerator));
});
