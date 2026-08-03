declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string; error?: string }) => void;
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = '510859691220-4bvllipioerrgmfenq1t0ubab1o85ems.apps.googleusercontent.com';

async function waitForGoogle(): Promise<boolean> {
  if (window.google?.accounts?.oauth2) return true;
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 100));
    if (window.google?.accounts?.oauth2) return true;
  }
  return false;
}

export async function initiateGoogleLogin(): Promise<void> {
  const ready = await waitForGoogle();
  if (!ready) {
    throw new Error('Google Sign-In is not available. Please try again or sign in with email.');
  }

  const client = window.google!.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'email profile openid',
    callback: async (tokenResponse) => {
      if (tokenResponse.error) return;

      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const ui = await res.json();
        const nameParts = (ui.name || 'Google User').split(' ');
        const user = {
          id: `google-${ui.sub}`,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ') || 'User',
          email: ui.email,
          avatar: ui.picture,
          role: 'user',
        };

        try {
          const { default: api } = await import('./api');
          const resp = await api.post('/auth/google', {
            email: ui.email, name: ui.name, avatar: ui.picture, googleId: ui.sub,
          });
          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('user', JSON.stringify(resp.data.user));
        } catch {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', `google-mock-${Date.now()}`);
        }

        window.location.href = '/';
      } catch (err) {
        console.error('Google sign-in error:', err);
      }
    },
  });

  client.requestAccessToken({ prompt: '' });
}
