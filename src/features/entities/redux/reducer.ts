import { areObjectsEqual } from '../../../shared/utils/are-objects-equal';
import {
  ADD_NEW_ENTITY,
  CLEAR_MESSAGES,
  EntitiesReducer,
  EntitiesSelector,
  EntitiesState,
  GET_ENTITIES,
  GET_ENTITIES_ERROR,
  GET_ENTITIES_SUCCESS,
  POST_UPDATED_ENTITIES,
  POST_UPDATED_ENTITIES_ERROR,
  POST_UPDATED_ENTITIES_SUCCESS,
  REMOVE_ENTITY,
  REVERT_ENTITY_CHANGES,
  UPDATE_ENTITY,
} from './types';

export const initialState: EntitiesState = {
  entities: [],
  lastSavedEntities: [],
  loading: true,
  messages: [],
};

export const entitiesReducer: EntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITIES:
    case POST_UPDATED_ENTITIES:
      return { ...state, loading: true };
    case GET_ENTITIES_SUCCESS:
      return { ...state, entities: action.payload, lastSavedEntities: action.payload, loading: false };
    case GET_ENTITIES_ERROR:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    case ADD_NEW_ENTITY:
      return { ...state, entities: [...state.entities, action.payload] };
    case UPDATE_ENTITY:
      const { oldEntity, newEntity } = action.payload;

      return {
        ...state,
        entities: state.entities.map((entity) => (areObjectsEqual(entity, oldEntity) ? newEntity : entity)),
      };
    case REMOVE_ENTITY:
      return {
        ...state,
        entities: state.entities.filter((entity) => !areObjectsEqual(entity, action.payload)),
      };
    case REVERT_ENTITY_CHANGES:
      return { ...state, entities: state.lastSavedEntities };
    case POST_UPDATED_ENTITIES_SUCCESS:
      return {
        ...state,
        lastSavedEntities: state.entities,
        loading: false,
        messages: [...state.messages, { type: 'success', text: 'You have successfully saved your changes' }],
      };
    case POST_UPDATED_ENTITIES_ERROR:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

export const entitiesSelector: EntitiesSelector = (state) => state.entitiesReducer;
