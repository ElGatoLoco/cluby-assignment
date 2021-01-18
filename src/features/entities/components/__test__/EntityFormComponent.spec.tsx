import { render } from '@testing-library/react';
import React from 'react';
import { FormContextProvider } from 'react-form-fp';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import { store } from '../../../../store';
import { ENTITY_FORM_NAME } from '../../constants';
import { EntitiesContext, EntitiesContextT } from '../../context';
import { createFormModel, createValidationSchema } from '../../utils';
import { EntityFormComponent } from '../EntityFormComponent';

const schema = {
  fields: [
    {
      id: 'carModel',
      title: 'Car model',
      validationRegex: '^(?!\\s)(?!.*\\s$)[a-zA-Z0-9\\s\\.-]{1,64}$',
    },
    {
      id: 'licensePlate',
      title: 'License plate',
      validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
    },
  ],
  id: 'cars',
  title: 'My car list',
};
const formModel = createFormModel(ENTITY_FORM_NAME, schema.fields);
const validationSchema = createValidationSchema(ENTITY_FORM_NAME, schema.fields);

const renderFormWithProviders = (contextUpdates?: Partial<EntitiesContextT>) => {
  const mockEntitiesContextValue = {} as EntitiesContextT;

  return render(
    <Provider store={store}>
      <ToastProvider>
        <EntitiesContext.Provider value={{ ...mockEntitiesContextValue, ...contextUpdates }}>
          <FormContextProvider initialState={formModel} validationSchema={validationSchema}>
            <EntityFormComponent schema={schema} />
          </FormContextProvider>
        </EntitiesContext.Provider>
      </ToastProvider>
    </Provider>,
  );
};

test('renders empty form correctly', async () => {
  const { getByText } = renderFormWithProviders({ isEntityFormModalVisible: true });

  expect(getByText(/Add new entity/i)).toBeInTheDocument();
  expect(getByText(/Car model/i)).toBeInTheDocument();
  expect(getByText(/License plate/i)).toBeInTheDocument();
});

test('renders edit form correctly', async () => {
  const { queryByDisplayValue } = renderFormWithProviders({
    isEntityFormModalVisible: true,
    currentlyEditedEntity: {
      carModel: 'Tesla Model 3',
      licensePlate: 'ABC-123',
    },
  });

  expect(queryByDisplayValue(/Tesla Model 3/i)).toBeInTheDocument();
  expect(queryByDisplayValue(/ABC-123/i)).toBeInTheDocument();
});

test("doesn't render form when hidden", async () => {
  const { queryByText } = renderFormWithProviders();

  expect(queryByText(/Car model/i)).not.toBeInTheDocument();
  expect(queryByText(/License plate/i)).not.toBeInTheDocument();
});
