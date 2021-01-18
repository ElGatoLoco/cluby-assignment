import React from 'react';

import { renderWithProviders } from '../../../../shared/test/render-with-providers';
import { EntitiesActions } from '../EntitiesActions';

test('renders entities actions component in isolation', () => {
  const { container, getByText } = renderWithProviders(<EntitiesActions />);

  expect(container.getElementsByClassName('actions-wrapper').length).toBe(1);
  expect(getByText(/Add new/i)).toBeInTheDocument();
  expect(getByText(/Revert/i)).toBeInTheDocument();
  expect(getByText(/Save changes/i)).toBeInTheDocument();
});

test('renders add new button regularly by default', () => {
  const { getByText } = renderWithProviders(<EntitiesActions />);
  expect(getByText(/Add new/i).closest('button')).not.toHaveAttribute('disabled');
});

test('renders revert button disabled by default', () => {
  const { getByText } = renderWithProviders(<EntitiesActions />);
  expect(getByText(/Revert/i).closest('button')).toHaveAttribute('disabled');
});

test('renders save changes button disabled by default', () => {
  const { getByText } = renderWithProviders(<EntitiesActions />);
  expect(getByText(/Save changes/i).closest('button')).toHaveAttribute('disabled');
});
