import { FC, createContext, useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToastMessages } from '../../shared/hooks/useToastMessages';
import {
  addNewEntity,
  clearMessages,
  postUpdatedEntities,
  removeEntity,
  revertEntityChanges,
  updateEntity,
} from './redux/actions';
import { entitiesSelector } from './redux/reducer';
import { EntitiesState, Entity } from './redux/types';

export type EntitiesContextT = {
  isEntityFormModalVisible: boolean;
  submitEntityForm: (entity: Entity) => void;
  openEntityFormModal: () => void;
  closeEntityFormModal: () => void;
  removeExistingEntity: (entity: Entity) => () => void;
  revertChanges: () => void;
  sendUpdatedEntityDataToTheApi: () => void;
  currentlyEditedEntity?: Entity;
  editEntity: (entity: Entity) => () => void;
} & EntitiesState;

export const EntitiesContext = createContext({} as EntitiesContextT);
type UseEntitiesContext = () => EntitiesContextT;
export const useEntitiesContext: UseEntitiesContext = () => useContext(EntitiesContext);

export const EntitiesContextProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [isEntityFormModalVisible, setIsEntityFormModalVisible] = useState(false);
  const [currentlyEditedEntity, setCurrentlyEditedEntity] = useState<Entity>();
  const entitiesState = useSelector(entitiesSelector);
  const { entities, messages } = entitiesState;

  const editEntity = useCallback(
    (entity: Entity) => () => {
      setCurrentlyEditedEntity(entity);
      setIsEntityFormModalVisible(true);
    },
    [],
  );

  const openEntityFormModal = useCallback(() => {
    setIsEntityFormModalVisible(true);
  }, []);

  const closeEntityFormModal = useCallback(() => {
    setCurrentlyEditedEntity(undefined);
    setIsEntityFormModalVisible(false);
  }, []);

  const submitEntityForm = useCallback(
    (entity) => {
      currentlyEditedEntity
        ? dispatch(updateEntity({ oldEntity: currentlyEditedEntity, newEntity: entity }))
        : dispatch(addNewEntity(entity));
      setIsEntityFormModalVisible(false);
    },
    [dispatch, currentlyEditedEntity],
  );

  const removeExistingEntity = useCallback(
    (entity: Entity) => () => {
      dispatch(removeEntity(entity));
    },
    [dispatch],
  );

  const revertChanges = useCallback(() => {
    dispatch(revertEntityChanges());
  }, [dispatch]);

  const sendUpdatedEntityDataToTheApi = useCallback(() => {
    dispatch(postUpdatedEntities(entities));
  }, [dispatch, entities]);

  const clearToastMessages = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useToastMessages(messages, clearToastMessages);

  return (
    <EntitiesContext.Provider
      value={{
        isEntityFormModalVisible,
        openEntityFormModal,
        closeEntityFormModal,
        submitEntityForm,
        removeExistingEntity,
        revertChanges,
        sendUpdatedEntityDataToTheApi,
        currentlyEditedEntity,
        editEntity,
        ...entitiesState,
      }}
    >
      {children}
    </EntitiesContext.Provider>
  );
};
