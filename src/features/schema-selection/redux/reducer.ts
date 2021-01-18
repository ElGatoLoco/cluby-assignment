import {
  CLEAR_MESSAGES,
  SELECT_SCHEMA,
  SELECT_SCHEMA_ERROR,
  SELECT_SCHEMA_SUCCESS,
  SchemaSelectionReducer,
  SchemaSelectionSelector,
  SchemaSelectionState,
} from './types';

export const initialState: SchemaSelectionState = {
  schema: null,
  loading: true,
  messages: [],
};

export const schemaSelectionReducer: SchemaSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SCHEMA:
      return { ...state, loading: true };
    case SELECT_SCHEMA_SUCCESS:
      return { ...state, schema: action.payload, loading: false };
    case SELECT_SCHEMA_ERROR:
      return { ...state, messages: [...state.messages, action.payload], loading: false };
    case CLEAR_MESSAGES:
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export const schemaSelectionSelector: SchemaSelectionSelector = (state) => state.schemaSelectionReducer;
