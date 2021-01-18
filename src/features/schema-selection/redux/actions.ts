import { Message } from '../../../shared/types/Message';
import {
  CLEAR_MESSAGES,
  ClearMessages,
  SELECT_SCHEMA,
  SELECT_SCHEMA_ERROR,
  SELECT_SCHEMA_SUCCESS,
  Schema,
  SelectSchema,
  SelectSchemaError,
  SelectSchemaSuccess,
} from './types';

export const selectSchema = (schemaId: string): SelectSchema => ({
  type: SELECT_SCHEMA,
  payload: schemaId,
});

export const selectSchemaSuccess = (schema: Schema): SelectSchemaSuccess => ({
  type: SELECT_SCHEMA_SUCCESS,
  payload: schema,
});

export const selectSchemaError = (message: Message): SelectSchemaError => ({
  type: SELECT_SCHEMA_ERROR,
  payload: message,
});

export const clearMessages = (): ClearMessages => ({
  type: CLEAR_MESSAGES,
  payload: null,
});
