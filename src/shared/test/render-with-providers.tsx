import { RenderResult, render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import configureMockStore from 'redux-mock-store';

import { EntitiesContextProvider } from '../../features/entities/context';
import { initialState as entitiesInitialState } from '../../features/entities/redux/reducer';
import { EntitiesState } from '../../features/entities/redux/types';
import { initialState as schemaSelectionInitialState } from '../../features/schema-selection/redux/reducer';
import { SchemaSelectionState } from '../../features/schema-selection/redux/types';
import { store as realStore } from '../../store';

const initialState = {
  schemaSelectionReducer: schemaSelectionInitialState,
  entitiesReducer: entitiesInitialState,
};

type UpdatedState = {
  reducerName: string;
  state: Partial<SchemaSelectionState | EntitiesState>;
};
type RenderWithProviders = (children: ReactNode, updatedState?: UpdatedState) => RenderResult;
export const renderWithProviders: RenderWithProviders = (children, updatedState) => {
  const store = updatedState
    ? configureMockStore()({ ...initialState, [updatedState.reducerName]: { ...initialState, ...updatedState.state } })
    : realStore;

  return render(
    <Provider store={store as typeof realStore}>
      <ToastProvider autoDismiss={true} autoDismissTimeout={3000} placement="top-center">
        <EntitiesContextProvider>{children}</EntitiesContextProvider>
      </ToastProvider>
    </Provider>,
  );
};
