import { MessageType } from '../../../../shared/types/Message';
import { initialState, schemaSelectionReducer } from '../reducer';
import { CLEAR_MESSAGES, SELECT_SCHEMA, SELECT_SCHEMA_ERROR, SELECT_SCHEMA_SUCCESS } from '../types';

test('sets state to loading when async action dispatched', () => {
  const loadingState = { ...initialState, loading: true };

  const selectSchemaActionResult = schemaSelectionReducer(initialState, {
    type: SELECT_SCHEMA,
    payload: 'some-schema-id',
  });

  expect(selectSchemaActionResult).toEqual(loadingState);
});

test('sets selected schema details when select schema success is dispatched', () => {
  const schema = {
    id: 'test',
    title: 'Test',
    fields: [],
  };
  const updatedState = {
    ...initialState,
    loading: false,
    schema,
  };
  const selectSchemaSuccessActionResult = schemaSelectionReducer(initialState, {
    type: SELECT_SCHEMA_SUCCESS,
    payload: schema,
  });

  expect(selectSchemaSuccessActionResult).toEqual(updatedState);
});

test('sets error message when select schema error is dispatched', () => {
  const message = {
    type: 'error' as MessageType,
    text: 'test error message',
  };
  const updatedState = {
    ...initialState,
    loading: false,
    messages: [message],
  };
  const selectSchemaErrorActionResult = schemaSelectionReducer(initialState, {
    type: SELECT_SCHEMA_ERROR,
    payload: message,
  });

  expect(selectSchemaErrorActionResult).toEqual(updatedState);
});

test('successfully clears messages', () => {
  const updatedState = {
    ...initialState,
    messages: [],
  };

  const previousState = { ...initialState, messages: [{ type: 'error' as MessageType, text: 'Something went wrong' }] };

  const clearMessagesActionResult = schemaSelectionReducer(previousState, {
    type: CLEAR_MESSAGES,
    payload: null,
  });

  expect(clearMessagesActionResult).toEqual(updatedState);
});
