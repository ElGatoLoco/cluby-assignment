import { Reducer } from 'redux';

import { Message } from '../../../shared/types/Message';
import { ReduxAction } from '../../../shared/types/ReduxAction';
import { RootState } from '../../../store';

export const GET_ENTITIES = 'GET_ENTITIES';
export const GET_ENTITIES_SUCCESS = 'GET_ENTITIES_SUCCESS';
export const GET_ENTITIES_ERROR = 'GET_ENTITIES_ERROR';
export const ADD_NEW_ENTITY = 'ADD_NEW_ENTITY';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export const REVERT_ENTITY_CHANGES = 'REVERT_ENTITY_CHANGES';
export const POST_UPDATED_ENTITIES = 'POST_UPDATED_ENTITIES';
export const POST_UPDATED_ENTITIES_SUCCESS = 'POST_UPDATED_ENTITIES_SUCCESS';
export const POST_UPDATED_ENTITIES_ERROR = 'POST_UPDATED_ENTITIES_ERROR';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

export type Entity = { [key: string]: string };

export type EntitiesState = {
  entities: Entity[];
  lastSavedEntities: Entity[];
  loading: boolean;
  messages: Message[];
};

export type GetEntities = ReduxAction<typeof GET_ENTITIES, string>;
export type GetEntitiesSuccess = ReduxAction<typeof GET_ENTITIES_SUCCESS, Entity[]>;
export type GetEntitiesError = ReduxAction<typeof GET_ENTITIES_ERROR, Message>;
export type AddNewEntity = ReduxAction<typeof ADD_NEW_ENTITY, Entity>;
export type UpdateEntityPayload = { oldEntity: Entity; newEntity: Entity };
export type UpdateEntity = ReduxAction<typeof UPDATE_ENTITY, UpdateEntityPayload>;
export type RemoveEntity = ReduxAction<typeof REMOVE_ENTITY, Entity>;
export type RevertEntityChanges = ReduxAction<typeof REVERT_ENTITY_CHANGES>;
export type PostUpdatedEntities = ReduxAction<typeof POST_UPDATED_ENTITIES, Entity[]>;
export type PostUpdatedEntitiesSuccess = ReduxAction<typeof POST_UPDATED_ENTITIES_SUCCESS>;
export type PostUpdatedEntitiesError = ReduxAction<typeof POST_UPDATED_ENTITIES_ERROR, Message>;
export type ClearMessages = ReduxAction<typeof CLEAR_MESSAGES>;

export type GetEntitiesAction =
  | GetEntities
  | GetEntitiesSuccess
  | GetEntitiesError
  | AddNewEntity
  | UpdateEntity
  | RemoveEntity
  | RevertEntityChanges
  | PostUpdatedEntities
  | PostUpdatedEntitiesSuccess
  | PostUpdatedEntitiesError
  | ClearMessages;

export type EntitiesReducer = Reducer<EntitiesState, GetEntitiesAction>;
export type EntitiesSelector = (state: RootState) => EntitiesState;

export type EntitiesEndpointResponse = {
  revision: number;
  data: Entity[];
  schema: string;
};
