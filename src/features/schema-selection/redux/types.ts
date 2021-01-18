import { Reducer } from 'redux';

import { Field } from '../../../shared/types/Field';
import { Message } from '../../../shared/types/Message';
import { ReduxAction } from '../../../shared/types/ReduxAction';
import { RootState } from '../../../store';

export const SELECT_SCHEMA = 'SELECT_SCHEMA';
export const SELECT_SCHEMA_SUCCESS = 'SELECT_SCHEMA_SUCCESS';
export const SELECT_SCHEMA_ERROR = 'SELECT_SCHEMA_ERROR';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export type Schema = {
  id: string;
  title: string;
  fields: Field[];
};

export type SchemaSelectionState = {
  schema: Schema | null;
  loading: boolean;
  messages: Message[];
};

export type SelectSchema = ReduxAction<typeof SELECT_SCHEMA, string>;
export type SelectSchemaSuccess = ReduxAction<typeof SELECT_SCHEMA_SUCCESS, Schema>;
export type SelectSchemaError = ReduxAction<typeof SELECT_SCHEMA_ERROR, Message>;
export type ClearMessages = ReduxAction<typeof CLEAR_MESSAGES>;

export type SelectSchemaAction = SelectSchema | SelectSchemaSuccess | SelectSchemaError | ClearMessages;

export type SchemaSelectionReducer = Reducer<SchemaSelectionState, SelectSchemaAction>;
export type SchemaSelectionSelector = (state: RootState) => SchemaSelectionState;
export type SchemaSelector = (state: RootState) => Schema | null;
