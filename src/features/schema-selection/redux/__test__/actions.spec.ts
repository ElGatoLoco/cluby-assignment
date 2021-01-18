import { MessageType } from '../../../../shared/types/Message';
import { clearMessages, selectSchema, selectSchemaError, selectSchemaSuccess } from '../actions';
import { CLEAR_MESSAGES, SELECT_SCHEMA, SELECT_SCHEMA_ERROR, SELECT_SCHEMA_SUCCESS } from '../types';

test('get select schema action creator', () => {
  const schemaId = 'some-schema-id';
  const expectedAction = {
    type: SELECT_SCHEMA,
    payload: schemaId,
  };
  expect(selectSchema(schemaId)).toEqual(expectedAction);
});

test('get select schema success action creator', () => {
  const schema = { id: 'test', title: 'Test', fields: [] };
  const expectedAction = {
    type: SELECT_SCHEMA_SUCCESS,
    payload: schema,
  };
  expect(selectSchemaSuccess(schema)).toEqual(expectedAction);
});

test('get select schema error action creator', () => {
  const message = {
    type: 'error' as MessageType,
    text: 'test error message',
  };
  const expectedAction = {
    type: SELECT_SCHEMA_ERROR,
    payload: message,
  };
  expect(selectSchemaError(message)).toEqual(expectedAction);
});

test('clear messages action creator', () => {
  const expectedAction = {
    type: CLEAR_MESSAGES,
    payload: null,
  };
  expect(clearMessages()).toEqual(expectedAction);
});
