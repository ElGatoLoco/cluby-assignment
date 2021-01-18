import { SagaIterator } from 'redux-saga';
import { StrictEffect, call, put, select, takeLatest } from 'redux-saga/effects';

import { parseAxiosResponseToMessage } from '../../../shared/utils/parse-axios-response-to-message';
import { schemaSelectionSelector } from '../../schema-selection/redux/reducer';
import { getEntitiesError, getEntitiesSuccess, postUpdatedEntitiesError, postUpdatedEntitiesSuccess } from './actions';
import { getEntitiesRequest, postUpdatedEntitiesRequest } from './requests';
import {
  EntitiesEndpointResponse,
  GET_ENTITIES,
  GetEntities,
  POST_UPDATED_ENTITIES,
  PostUpdatedEntities,
} from './types';

export function* getEntitiesSaga({ payload }: GetEntities): SagaIterator {
  try {
    const { data }: EntitiesEndpointResponse = yield call(getEntitiesRequest, payload);
    yield put(getEntitiesSuccess(data));
  } catch (e) {
    yield put(getEntitiesError(parseAxiosResponseToMessage(e, 'error')));
  }
}

export function* postUpdatedEntitiesSaga({ payload }: PostUpdatedEntities): SagaIterator {
  const { schema } = yield select(schemaSelectionSelector);
  try {
    yield call(postUpdatedEntitiesRequest, schema.id, payload);
    yield put(postUpdatedEntitiesSuccess());
  } catch (e) {
    yield put(postUpdatedEntitiesError(parseAxiosResponseToMessage(e, 'error')));
  }
}

export function* getEntitiesWatcher(): Generator<StrictEffect> {
  yield takeLatest(GET_ENTITIES, getEntitiesSaga);
}

export function* postUpdatedEntitiesWatcher(): Generator<StrictEffect> {
  yield takeLatest(POST_UPDATED_ENTITIES, postUpdatedEntitiesSaga);
}
