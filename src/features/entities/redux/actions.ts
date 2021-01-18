import { Message } from '../../../shared/types/Message';
import {
  ADD_NEW_ENTITY,
  AddNewEntity,
  CLEAR_MESSAGES,
  ClearMessages,
  Entity,
  GET_ENTITIES,
  GET_ENTITIES_ERROR,
  GET_ENTITIES_SUCCESS,
  GetEntities,
  GetEntitiesError,
  GetEntitiesSuccess,
  POST_UPDATED_ENTITIES,
  POST_UPDATED_ENTITIES_ERROR,
  POST_UPDATED_ENTITIES_SUCCESS,
  PostUpdatedEntities,
  PostUpdatedEntitiesError,
  PostUpdatedEntitiesSuccess,
  REMOVE_ENTITY,
  REVERT_ENTITY_CHANGES,
  RemoveEntity,
  RevertEntityChanges,
  UPDATE_ENTITY,
  UpdateEntity,
  UpdateEntityPayload,
} from './types';

export const getEntities = (schemaId: string): GetEntities => ({
  type: GET_ENTITIES,
  payload: schemaId,
});

export const getEntitiesSuccess = (entities: Entity[]): GetEntitiesSuccess => ({
  type: GET_ENTITIES_SUCCESS,
  payload: entities,
});

export const getEntitiesError = (message: Message): GetEntitiesError => ({
  type: GET_ENTITIES_ERROR,
  payload: message,
});

export const addNewEntity = (entity: Entity): AddNewEntity => ({
  type: ADD_NEW_ENTITY,
  payload: entity,
});

export const updateEntity = (payload: UpdateEntityPayload): UpdateEntity => ({
  type: UPDATE_ENTITY,
  payload,
});

export const removeEntity = (entity: Entity): RemoveEntity => ({
  type: REMOVE_ENTITY,
  payload: entity,
});

export const revertEntityChanges = (): RevertEntityChanges => ({
  type: REVERT_ENTITY_CHANGES,
  payload: null,
});

export const postUpdatedEntities = (entities: Entity[]): PostUpdatedEntities => ({
  type: POST_UPDATED_ENTITIES,
  payload: entities,
});

export const postUpdatedEntitiesSuccess = (): PostUpdatedEntitiesSuccess => ({
  type: POST_UPDATED_ENTITIES_SUCCESS,
  payload: null,
});

export const postUpdatedEntitiesError = (message: Message): PostUpdatedEntitiesError => ({
  type: POST_UPDATED_ENTITIES_ERROR,
  payload: message,
});

export const clearMessages = (): ClearMessages => ({
  type: CLEAR_MESSAGES,
  payload: null,
});
