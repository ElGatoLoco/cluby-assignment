import React from 'react';

import { renderWithProviders } from '../../../../shared/test/render-with-providers';
import { EntitiesList } from '../EntitiesList';

test('renders spinner while loading data', () => {
  const { container } = renderWithProviders(<EntitiesList />);
  expect(container.getElementsByClassName('spinner-wrapper').length).toBe(1);
});

test('renders entities list component in isolation with no data', () => {
  const mockedState = {
    reducerName: 'entitiesReducer',
    state: {
      entities: [],
    },
  };
  const { getByText } = renderWithProviders(<EntitiesList />, mockedState);

  expect(getByText(/There are no records/i)).toBeInTheDocument();
});

test('renders entities list component in isolation with some data', () => {
  const mockedState = {
    reducerName: 'entitiesReducer',
    state: {
      entities: [
        {
          carModel: 'Tesla Model 3',
          licensePlate: 'ABC-123',
        },
        {
          carModel: 'BMW 520d 2.0 Diesel',
          licensePlate: 'BMW-1',
        },
        {
          carModel: 'Porsche 911 Turbo S',
          licensePlate: 'POR-53',
        },
      ],
    },
  };
  const { getByText } = renderWithProviders(<EntitiesList />, mockedState);

  expect(getByText(/Tesla Model 3/i)).toBeInTheDocument();
});
