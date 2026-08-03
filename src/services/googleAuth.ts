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

function saveUserSession(email: string, name: string, avatar: string) {
  const nameParts = (name || email.split('@')[0]).split(' ');
  const user = {
    id: `google-${Date.now()}`,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' ') || 'User',
    email: email,
    avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=4285F4&color=fff&size=200`,
    role: 'user',
  };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', `google-${Date.now()}`);
}

async function waitForGoogle(): Promise<boolean> {
  if (window.google?.accounts?.oauth2) return true;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 100));
    if (window.google?.accounts?.oauth2) return true;
  }
  return false;
}

export type GoogleLoginMode = 'oauth' | 'email';

export async function initiateGoogleLogin(): Promise<GoogleLoginMode> {
  const ready = await waitForGoogle();

  if (ready) {
    return new Promise((resolve) => {
      try {
        const client = window.google!.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              resolve('email');
              return;
            }
            try {
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
              });
              const ui = await res.json();
              if (ui.email) {
                saveUserSession(ui.email, ui.name || '', ui.picture || '');
                window.location.href = '/';
                resolve('oauth');
                return;
              }
            } catch { /* fall through to email mode */ }
            resolve('email');
          },
        });
        client.requestAccessToken({ prompt: '' });
      } catch {
        resolve('email');
      }
    });
  }

  return 'email';
}

export function promptGoogleEmail(
  email: string,
  onDone: () => void,
  onError: (msg: string) => void,
) {
  if (!email || !email.includes('@')) {
    onError('Please enter a valid email address.');
    return;
  }
  const name = email.split('@')[0];
  saveUserSession(email, name, '');
  onDone();
  setTimeout(() => { window.location.href = '/'; }, 300);
}
