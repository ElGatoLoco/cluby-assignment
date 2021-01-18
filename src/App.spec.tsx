import { render } from '@testing-library/react';
import React from 'react';

import App from './App';
import { EntitiesContext } from './features/entities/context';
import { initialState as entitiesInitialState } from './features/entities/redux/reducer';
import { SchemaSelectionContext } from './features/schema-selection/context';
import { initialState as schemaSelectionInitialState } from './features/schema-selection/redux/reducer';
import { noOp } from './shared/utils/no-op';

test('renders initial app content', () => {
  const { container } = render(
    <EntitiesContext.Provider
      value={{
        isEntityFormModalVisible: false,
        submitEntityForm: noOp,
        openEntityFormModal: noOp,
        closeEntityFormModal: noOp,
        // eslint-disable-next-line no-empty-pattern
        removeExistingEntity: ({}) => noOp,
        revertChanges: noOp,
        sendUpdatedEntityDataToTheApi: noOp,
        // eslint-disable-next-line no-empty-pattern
        editEntity: ({}) => noOp,
        ...entitiesInitialState,
      }}
    >
      <SchemaSelectionContext.Provider value={{ onSchemaSelect: noOp, ...schemaSelectionInitialState }}>
        <App />
      </SchemaSelectionContext.Provider>
    </EntitiesContext.Provider>,
  );

  expect(container.getElementsByClassName('ant-row').length).toBe(2);
});
