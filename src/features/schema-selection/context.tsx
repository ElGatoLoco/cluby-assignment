import { FC, createContext, useCallback, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { environment } from '../../environment';
import { useToastMessages } from '../../shared/hooks/useToastMessages';
import { getEntities } from '../entities/redux/actions';
import { clearMessages, selectSchema } from './redux/actions';
import { schemaSelectionSelector } from './redux/reducer';
import { SchemaSelectionState } from './redux/types';

type SchemaSelectionContext = {
  onSchemaSelect: (schemaId: string) => void;
} & SchemaSelectionState;

export const SchemaSelectionContext = createContext({} as SchemaSelectionContext);
type UseSchemaSelectionContext = () => SchemaSelectionContext;
export const useSchemaSelectionContext: UseSchemaSelectionContext = () => useContext(SchemaSelectionContext);

export const SchemaSelectionContextProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const schemaSelectionState = useSelector(schemaSelectionSelector);
  const { schema, messages } = schemaSelectionState;

  const onSchemaSelect = useCallback(
    (schemaId: string) => {
      dispatch(selectSchema(schemaId));
    },
    [dispatch],
  );

  const clearToastMessages = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useToastMessages(messages, clearToastMessages);

  useEffect(() => {
    dispatch(selectSchema(environment.availableSchemas[0]));
  }, [dispatch]);

  useEffect(() => {
    if (schema) {
      dispatch(getEntities(schema.id));
    }
  }, [dispatch, schema]);

  return (
    <SchemaSelectionContext.Provider
      value={{
        onSchemaSelect,
        ...schemaSelectionState,
      }}
    >
      {children}
    </SchemaSelectionContext.Provider>
  );
};
