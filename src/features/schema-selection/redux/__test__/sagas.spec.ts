import { AnyAction, Reducer } from 'redux';
import { expectSaga } from 'redux-saga-test-plan';

import { parseAxiosResponseToMessage } from '../../../../shared/utils/parse-axios-response-to-message';
import { selectSchema, selectSchemaError, selectSchemaSuccess } from '../actions';
import { initialState, schemaSelectionReducer } from '../reducer';
import { selectSchemaRequest } from '../requests';
import { selectSchemaSaga } from '../sagas';
import { SchemaSelectionState } from '../types';

test('get schema selection successfull', () => {
  const mockSchemaResponse = {
    fields: [
      {
        id: 'carModel',
        title: 'Car model',
        validationRegex: '^(?!\\s)(?!.*\\s$)[a-zA-Z0-9\\s\\.-]{1,64}$',
      },
      {
        id: 'licensePlate',
        title: 'License plate',
        validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
      },
    ],
    id: 'cars',
    title: 'My car list',
  };
  const expectedFinalState = {
    ...initialState,
    loading: false,
    schema: mockSchemaResponse,
  };

  return expectSaga(selectSchemaSaga, selectSchema('cars'))
    .withReducer(schemaSelectionReducer as Reducer<SchemaSelectionState, AnyAction>, initialState)
    .provide({
      call({ fn }, next) {
        if (fn === selectSchemaRequest) {
          return mockSchemaResponse;
        }

        return next;
      },
    })
    .put(selectSchemaSuccess(mockSchemaResponse))
    .hasFinalState(expectedFinalState)
    .run();
});

test('get schema selection failed', () => {
  const mockAxiosRejectedValue = {
    data: null,
    status: 401,
    statusText: 'string',
    headers: {},
    config: {},
    request: {},
  };
  const expectedFinalState = {
    ...initialState,
    loading: false,
    messages: [{ type: 'error', text: '401' }],
  };

  return expectSaga(selectSchemaSaga, selectSchema('cars'))
    .withReducer(schemaSelectionReducer as Reducer<SchemaSelectionState, AnyAction>, initialState)
    .provide({
      call({ fn }, next) {
        if (fn === selectSchemaRequest) {
          throw mockAxiosRejectedValue;
        }

        return next;
      },
    })
    .put(selectSchemaError(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')))
    .hasFinalState(expectedFinalState)
    .run();
});
