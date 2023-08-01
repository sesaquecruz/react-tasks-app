import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { store } from './app/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { clientId, domain, audience, scope } from './features/auth/auth';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: audience,
            scope: scope,
          }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </ BrowserRouter>
  </React.StrictMode>
);
