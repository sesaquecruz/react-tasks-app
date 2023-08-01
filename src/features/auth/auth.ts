import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

export const domain = process.env?.REACT_APP_AUTH0_DOMAIN ?? '';
export const clientId = process.env?.REACT_APP_AUTH0_CLIENT_ID ?? '';
export const audience = `https://${process.env?.REACT_APP_AUTH0_DOMAIN ?? ''}/api/v2/`;
export const scope = "profile read:current_user";

let isAuthenticated: boolean;
let getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;

export const auth = {
  setIsAuthenticated: (arg: boolean) => (isAuthenticated = arg),
  setAccessTokenSilently: (func: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>) =>
    (getAccessTokenSilently = func),
  isAuthenticated: () => isAuthenticated,
  getAccessTokenSilently: () => getAccessTokenSilently,
};
