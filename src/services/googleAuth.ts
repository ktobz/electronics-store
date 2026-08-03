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
const NETLIFY_URL = 'https://lecmanstore.netlify.app';

function saveSession(userInfo: { sub: string; name: string; email: string; picture: string }) {
  const nameParts = (userInfo.name || 'Google User').split(' ');
  const user = {
    id: `google-${userInfo.sub}`,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' ') || 'User',
    email: userInfo.email,
    avatar: userInfo.picture,
    role: 'user',
  };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', `google-${Date.now()}`);
}

export async function handleGoogleRedirect(): Promise<boolean> {
  const hash = window.location.hash;
  if (!hash || !hash.includes('access_token')) return false;

  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const error = params.get('error');

  if (error || !accessToken) return false;

  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const ui = await res.json();
    if (!ui.email) return false;

    saveSession(ui);
    window.location.hash = '';
    window.location.href = '/';
    return true;
  } catch {
    return false;
  }
}

export function initiateGoogleLogin(): void {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: NETLIFY_URL,
    response_type: 'token',
    scope: 'email profile openid',
    prompt: 'select_account',
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
