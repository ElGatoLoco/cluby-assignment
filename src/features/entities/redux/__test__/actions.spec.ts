import { MessageType } from '../../../../shared/types/Message';
import {
  addNewEntity,
  clearMessages,
  getEntities,
  getEntitiesError,
  getEntitiesSuccess,
  postUpdatedEntities,
  postUpdatedEntitiesError,
  postUpdatedEntitiesSuccess,
  removeEntity,
  revertEntityChanges,
  updateEntity,
} from '../actions';
import {
  ADD_NEW_ENTITY,
  CLEAR_MESSAGES,
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

test('get entities action creator', () => {
  const schemaId = 'some-schema-id';
  const expectedAction = {
    type: GET_ENTITIES,
    payload: schemaId,
  };
  expect(getEntities(schemaId)).toEqual(expectedAction);
});

test('get entities success action creator', () => {
  const entities = [
    {
      test: 'test',
    },
  ];
  const expectedAction = {
    type: GET_ENTITIES_SUCCESS,
    payload: entities,
  };
  expect(getEntitiesSuccess(entities)).toEqual(expectedAction);
});

test('get entities error action creator', () => {
  const message = {
    type: 'success' as MessageType,
    text: 'test success message',
  };
  const expectedAction = {
    type: GET_ENTITIES_ERROR,
    payload: message,
  };
  expect(getEntitiesError(message)).toEqual(expectedAction);
});

test('add new entity action creator', () => {
  const entity = {
    test: 'test',
  };
  const expectedAction = {
    type: ADD_NEW_ENTITY,
    payload: entity,
  };
  expect(addNewEntity(entity)).toEqual(expectedAction);
});

test('update entity action creator', () => {
  const payload = {
    oldEntity: {
      test: 'test',
    },
    newEntity: {
      test: 'updated test',
    },
  };
  const expectedAction = {
    type: UPDATE_ENTITY,
    payload: payload,
  };
  expect(updateEntity(payload)).toEqual(expectedAction);
});

test('remove entity action creator', () => {
  const entity = {
    test: 'test',
  };
  const expectedAction = {
    type: REMOVE_ENTITY,
    payload: entity,
  };
  expect(removeEntity(entity)).toEqual(expectedAction);
});

test('revert entity changes action creator', () => {
  const expectedAction = {
    type: REVERT_ENTITY_CHANGES,
    payload: null,
  };
  expect(revertEntityChanges()).toEqual(expectedAction);
});

test('post updated entities action creator', () => {
  const entities = [
    {
      test: 'test',
    },
  ];
  const expectedAction = {
    type: POST_UPDATED_ENTITIES,
    payload: entities,
  };
  expect(postUpdatedEntities(entities)).toEqual(expectedAction);
});

test('post updated entities success action creator', () => {
  const expectedAction = {
    type: POST_UPDATED_ENTITIES_SUCCESS,
    payload: null,
  };
  expect(postUpdatedEntitiesSuccess()).toEqual(expectedAction);
});

test('post updated entities error action creator', () => {
  const message = {
    type: 'error' as MessageType,
    text: 'test error message',
  };
  const expectedAction = {
    type: POST_UPDATED_ENTITIES_ERROR,
    payload: message,
  };
  expect(postUpdatedEntitiesError(message)).toEqual(expectedAction);
});

test('clear messages action creator', () => {
  const expectedAction = {
    type: CLEAR_MESSAGES,
    payload: null,
  };
  expect(clearMessages()).toEqual(expectedAction);
});
