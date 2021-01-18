import { SagaIterator } from 'redux-saga';
import { StrictEffect, call, put, takeLatest } from 'redux-saga/effects';

import { parseAxiosResponseToMessage } from '../../../shared/utils/parse-axios-response-to-message';
import { selectSchemaError, selectSchemaSuccess } from './actions';
import { selectSchemaRequest } from './requests';
import { SELECT_SCHEMA, Schema, SelectSchema } from './types';

export function* selectSchemaSaga({ payload }: SelectSchema): SagaIterator {
  try {
    const schema: Schema = yield call(selectSchemaRequest, payload);
    yield put(selectSchemaSuccess(schema));
  } catch (e) {
    yield put(selectSchemaError(parseAxiosResponseToMessage(e, 'error')));
  }
}

export function* selectSchemaWatcher(): Generator<StrictEffect> {
  yield takeLatest(SELECT_SCHEMA, selectSchemaSaga);
}
