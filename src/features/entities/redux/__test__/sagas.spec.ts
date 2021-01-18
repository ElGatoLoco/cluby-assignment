import { AnyAction, Reducer } from 'redux';
import { expectSaga } from 'redux-saga-test-plan';

import { parseAxiosResponseToMessage } from '../../../../shared/utils/parse-axios-response-to-message';
import { schemaSelectionSelector } from '../../../schema-selection/redux/reducer';
import {
  getEntities,
  getEntitiesError,
  getEntitiesSuccess,
  postUpdatedEntities,
  postUpdatedEntitiesError,
  postUpdatedEntitiesSuccess,
} from '../actions';
import { entitiesReducer, initialState } from '../reducer';
import { getEntitiesRequest, postUpdatedEntitiesRequest } from '../requests';
import { getEntitiesSaga, postUpdatedEntitiesSaga } from '../sagas';
import { EntitiesState } from '../types';

test('get entities successfully fetched', () => {
  const mockEntitiesResponse = {
    data: [
      {
        carModel: 'Tesla Model 3',
        licensePlate: 'ABC-123',
      },
      {
        carModel: 'BMW 520d 2.0 Diesel',
        licensePlate: 'BMW-1',
      },
      {
        carModel: 'Porsche 911 Turbo S',
        licensePlate: 'POR-53',
      },
    ],
    revision: 1,
    schema: 'cars',
  };
  const expectedFinalState = {
    ...initialState,
    loading: false,
    entities: mockEntitiesResponse.data,
    lastSavedEntities: mockEntitiesResponse.data,
  };

  return expectSaga(getEntitiesSaga, getEntities('cars'))
    .withReducer(entitiesReducer as Reducer<EntitiesState, AnyAction>, initialState)
    .provide({
      call({ fn }, next) {
        if (fn === getEntitiesRequest) {
          return mockEntitiesResponse;
        }

        return next;
      },
    })
    .put(getEntitiesSuccess(mockEntitiesResponse.data))
    .hasFinalState(expectedFinalState)
    .run();
});

test('get entities fetch failed', () => {
  const expectedFinalState = {
    ...initialState,
    loading: false,
    messages: [{ type: 'error', text: '401' }],
  };
  const mockAxiosRejectedValue = {
    data: null,
    status: 401,
    statusText: 'string',
    headers: {},
    config: {},
    request: {},
  };

  return expectSaga(getEntitiesSaga, getEntities('cars'))
    .withReducer(entitiesReducer as Reducer<EntitiesState, AnyAction>, initialState)
    .provide({
      call({ fn }, next) {
        if (fn === getEntitiesRequest) {
          throw mockAxiosRejectedValue;
        }

        return next;
      },
    })
    .put(getEntitiesError(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')))
    .hasFinalState(expectedFinalState)
    .run();
});

test('post updated entities success', () => {
  const expectedFinalState = {
    ...initialState,
    loading: false,
    messages: [{ type: 'success', text: 'You have successfully saved your changes' }],
  };
  const updatedEntities = [
    {
      carModel: 'Tesla Model 3',
      licensePlate: 'CDE-123',
    },
  ];
  const mockPostUpdatedEntitiesResponse = {
    count: 1,
    revision: 1,
    schema: 'cars',
  };
  const mockSchema = {
    id: 'cars',
    title: 'My Cars List',
    fields: [],
  };

  return expectSaga(postUpdatedEntitiesSaga, postUpdatedEntities(updatedEntities))
    .withReducer(entitiesReducer as Reducer<EntitiesState, AnyAction>, initialState)
    .provide({
      select({ selector }, next) {
        if (selector === schemaSelectionSelector) {
          return { schema: mockSchema };
        }

        return next;
      },
      call({ fn }, next) {
        if (fn === postUpdatedEntitiesRequest) {
          return mockPostUpdatedEntitiesResponse;
        }

        return next;
      },
    })
    .put(postUpdatedEntitiesSuccess())
    .hasFinalState(expectedFinalState)
    .run();
});

test('post updated entities fail', () => {
  const expectedFinalState = {
    ...initialState,
    loading: false,
    messages: [{ type: 'error', text: '401' }],
  };
  const updatedEntities = [
    {
      carModel: 'Tesla Model 3',
      licensePlate: 'CDE-123',
    },
  ];
  const mockSchema = {
    id: 'cars',
    title: 'My Cars List',
    fields: [],
  };

  const mockAxiosRejectedValue = {
    data: null,
    status: 401,
    statusText: 'string',
    headers: {},
    config: {},
    request: {},
  };

  return expectSaga(postUpdatedEntitiesSaga, postUpdatedEntities(updatedEntities))
    .withReducer(entitiesReducer as Reducer<EntitiesState, AnyAction>, initialState)
    .provide({
      select({ selector }, next) {
        if (selector === schemaSelectionSelector) {
          return { schema: mockSchema };
        }

        return next;
      },
      call({ fn }, next) {
        if (fn === postUpdatedEntitiesRequest) {
          throw mockAxiosRejectedValue;
        }

        return next;
      },
    })
    .put(postUpdatedEntitiesError(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')))
    .hasFinalState(expectedFinalState)
    .run();
});
