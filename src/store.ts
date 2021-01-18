import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { entitiesReducer } from './features/entities/redux/reducer';
import { getEntitiesWatcher, postUpdatedEntitiesWatcher } from './features/entities/redux/sagas';
import { schemaSelectionReducer } from './features/schema-selection/redux/reducer';
import { selectSchemaWatcher } from './features/schema-selection/redux/sagas';
import { combineWatchers } from './shared/utils/combine-watchers';

export const rootReducer = combineReducers({
  schemaSelectionReducer,
  entitiesReducer,
});

function* rootSaga() {
  yield all(combineWatchers(selectSchemaWatcher, getEntitiesWatcher, postUpdatedEntitiesWatcher));
}
const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
