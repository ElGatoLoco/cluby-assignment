import React from 'react';

import { renderWithProviders } from '../../shared/test/render-with-providers';
import { SchemaSelect } from './SchemaSelect';

test('renders schema select component in isolation', () => {
  const { container } = renderWithProviders(<SchemaSelect />);

  expect(container.getElementsByClassName('schema-select').length).toBe(1);
});
