export type ReduxAction<T, P = null> = {
  type: T;
  payload: P;
};
