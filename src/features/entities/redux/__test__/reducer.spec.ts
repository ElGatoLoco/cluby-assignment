import { MessageType } from '../../../../shared/types/Message';
import { CLEAR_MESSAGES } from '../../../schema-selection/redux/types';
import { entitiesReducer, initialState } from '../reducer';
import {
  ADD_NEW_ENTITY,
  GET_ENTITIES,
  GET_ENTITIES_ERROR,
  GET_ENTITIES_SUCCESS,
  POST_UPDATED_ENTITIES,
  POST_UPDATED_ENTITIES_ERROR,
  POST_UPDATED_ENTITIES_SUCCESS,
  REMOVE_ENTITY,
  REVERT_ENTITY_CHANGES,
  UPDATE_ENTITY,
} from '../types';

test('sets state to loading when async action dispatched', () => {
  const loadingState = { ...initialState, loading: true };

  const getEntitiesActionResult = entitiesReducer(initialState, {
    type: GET_ENTITIES,
    payload: 'some-schema-id',
  });

  const postUpdatedEntitiesActionResult = entitiesReducer(initialState, {
    type: POST_UPDATED_ENTITIES,
    payload: [
      {
        test: 'test',
      },
    ],
  });

  expect(getEntitiesActionResult).toEqual(loadingState);
  expect(postUpdatedEntitiesActionResult).toEqual(loadingState);
});

test('sets appropriate entities data when get entities success is dispatched', () => {
  const entities = [
    {
      test: 'test',
    },
  ];
  const stateWithEntities = { ...initialState, entities, lastSavedEntities: entities, loading: false };

  const getEntitiesSuccessActionResult = entitiesReducer(initialState, {
    type: GET_ENTITIES_SUCCESS,
    payload: entities,
  });

  expect(getEntitiesSuccessActionResult).toEqual(stateWithEntities);
});

test('appends error message when get entities error is dispatched', () => {
  const message = {
    type: 'error' as MessageType,
    text: 'test error message',
  };
  const stateWithErrorMessage = { ...initialState, messages: [...initialState.messages, message], loading: false };

  const getEntitiesErrorActionResult = entitiesReducer(initialState, {
    type: GET_ENTITIES_ERROR,
    payload: message,
  });

  expect(getEntitiesErrorActionResult).toEqual(stateWithErrorMessage);
});

test('adds new entity when add new entity action is dispatched', () => {
  const entity = {
    test: 'test',
  };
  const stateWithNewEntity = { ...initialState, entities: [...initialState.entities, entity] };

  const addNewEntityActionResult = entitiesReducer(initialState, {
    type: ADD_NEW_ENTITY,
    payload: entity,
  });

  expect(addNewEntityActionResult).toEqual(stateWithNewEntity);
});

test('updates an entity when update entity action is dispatched', () => {
  const payload = {
    oldEntity: {
      test: 'test',
    },
    newEntity: {
      test: 'updated test',
    },
  };
  const previousState = { ...initialState, entities: [{ test: 'test' }] };
  const stateWithUpdatedEntity = { ...initialState, entities: [{ test: 'updated test' }] };

  const updateEntityActionResult = entitiesReducer(previousState, {
    type: UPDATE_ENTITY,
    payload: payload,
  });

  expect(updateEntityActionResult).toEqual(stateWithUpdatedEntity);
});

test('removes an entity when remove entity is dispatched', () => {
  const entity = {
    test: 'test',
  };
  const previousState = { ...initialState, entities: [{ test: 'test' }] };
  const stateWithoutRemovedEntity = { ...initialState, entities: [] };

  const removeEntityActionResult = entitiesReducer(previousState, {
    type: REMOVE_ENTITY,
    payload: entity,
  });

  expect(removeEntityActionResult).toEqual(stateWithoutRemovedEntity);
});

test('reverts changes when revert entity action is dispatched', () => {
  const previousState = { ...initialState, entities: [{ test: 'test' }] };
  const stateWithRevertedChanges = { ...initialState, entities: [] };

  const revertChangesActionResult = entitiesReducer(previousState, {
    type: REVERT_ENTITY_CHANGES,
    payload: null,
  });

  expect(revertChangesActionResult).toEqual(stateWithRevertedChanges);
});

test('successfully update state on save changes success', () => {
  const updatedState = {
    ...initialState,
    loading: false,
    messages: [{ type: 'success', text: 'You have successfully saved your changes' }],
  };

  const postUpdatedEntitiesSuccessActionResult = entitiesReducer(initialState, {
    type: POST_UPDATED_ENTITIES_SUCCESS,
    payload: null,
  });

  expect(postUpdatedEntitiesSuccessActionResult).toEqual(updatedState);
});

test('successfully update state on save changes error', () => {
  const message = { type: 'error' as MessageType, text: 'Something went wrong' };
  const updatedState = {
    ...initialState,
    loading: false,
    messages: [message],
  };

  const postUpdatedEntitiesErrorActionResult = entitiesReducer(initialState, {
    type: POST_UPDATED_ENTITIES_ERROR,
    payload: message,
  });

  expect(postUpdatedEntitiesErrorActionResult).toEqual(updatedState);
});

test('successfully clears messages', () => {
  const updatedState = {
    ...initialState,
    messages: [],
  };

  const previousState = { ...initialState, messages: [{ type: 'error' as MessageType, text: 'Something went wrong' }] };

  const clearMessagesActionResult = entitiesReducer(previousState, {
    type: CLEAR_MESSAGES,
    payload: null,
  });

  expect(clearMessagesActionResult).toEqual(updatedState);
});
