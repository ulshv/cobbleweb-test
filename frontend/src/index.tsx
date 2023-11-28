import React from 'react';
import ReactDOM from 'react-dom/client';
import { configure as configureMobx } from 'mobx';

// https://github.com/remix-run/react-router/issues/8264#issuecomment-991271554
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { StoreProvider, browserHistory } from 'modules/shared';
import { ToastContainer } from 'react-toastify';
import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

configureMobx({ enforceActions: 'never' });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </StoreProvider>

    <ToastContainer />
  </React.StrictMode>,
);
