import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import App from './App';
import { EntitiesContextProvider } from './features/entities/context';
import { SchemaSelectionContextProvider } from './features/schema-selection/context';
import reportWebVitals from './reportWebVitals';
import {
  TOAST_MESSAGES_AUTO_DISMISS,
  TOAST_MESSAGES_AUTO_DISMISS_TIMEOUT_IN_MILISECONDS,
  TOAST_MESSAGES_PLACEMENT,
} from './shared/constants';
import { combineComponents } from './shared/utils/combine-components';
import { store } from './store';

const AppContext = combineComponents(EntitiesContextProvider, SchemaSelectionContextProvider);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
      autoDismiss={TOAST_MESSAGES_AUTO_DISMISS}
      autoDismissTimeout={TOAST_MESSAGES_AUTO_DISMISS_TIMEOUT_IN_MILISECONDS}
      placement={TOAST_MESSAGES_PLACEMENT}
    >
      <AppContext>
        <App />
      </AppContext>
    </ToastProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
