import { createAuthProvider } from 'react-token-auth';

type Session = { access_token: string };

export const { useAuth, authFetch, login, logout } =
  createAuthProvider<Session>({
    getAccessToken: (session) => session.access_token,
    storage: localStorage,
    onUpdateToken: (token) =>
      fetch('/api/refresh', {
        method: 'POST',
        body: token.access_token,
      }).then((r) => r.json()),
  });
