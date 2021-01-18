import { AxiosResponse } from 'axios';

import { parseAxiosResponseToMessage } from '../parse-axios-response-to-message';

test('parses with correct data', () => {
  const mockAxiosRejectedValue = {
    data: {
      message: 'Unauthorized',
    },
    status: 401,
    statusText: 'string',
    headers: {},
    config: {},
    request: {},
  };

  expect(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')).toEqual({ type: 'error', text: 'Unauthorized' });
});

test('parses with missing data and appropriate status', () => {
  const mockAxiosRejectedValue = {
    data: null,
    status: 401,
    statusText: 'string',
    headers: {},
    config: {},
    request: {},
  };

  expect(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')).toEqual({ type: 'error', text: '401' });
});

test('parses with missing data and without appropriate status', () => {
  const mockAxiosRejectedValue = {} as AxiosResponse;

  expect(parseAxiosResponseToMessage(mockAxiosRejectedValue, 'error')).toEqual({ type: 'error', text: 'error' });
});
