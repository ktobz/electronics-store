# Google Sign-In Fix for Electronics Store

## Problem
Google OAuth returned `invalid_client` / `no registered origin` or `redirect_uri_mismatch` errors when trying to sign in.

## Root Cause
The `@react-oauth/google` `GoogleLogin` component uses Google Identity Services (GIS), which requires the **JavaScript origin** (`http://localhost:5173`) to be registered in Google Cloud Console. Since this wasn't registered, the popup-based flow failed with "no registered origin" / "invalid_client".

## Solution: Server-Side OAuth 2.0 Flow

Instead of client-side Google Identity Services, we use a **server-side Authorization Code flow** through the Express backend on port 3001. This only requires a **redirect URI** to be registered (not a JavaScript origin).

### Flow
1. User clicks "Continue with Google" on `/login` or `/signup`
2. Button is an `<a href="/api/auth/google">` link — this goes to the backend (proxied by Vite)
3. Backend generates a Google OAuth URL with `redirect_uri=http://localhost:3001/api/auth/google/callback`
4. Google shows consent screen, user grants permission
5. Google redirects back to `http://localhost:3001/api/auth/google/callback?code=xxx`
6. Backend exchanges `code` for tokens (id_token, access_token) using `google-auth-library`
7. Backend decodes the id_token locally (base64 JWT) to get user info (email, name, picture)
8. Backend creates/finds user in MongoDB (falls back to mock DB), generates our own JWT
9. Backend redirects browser to `/auth/callback?token=xxx&user=xxx`
10. Frontend AuthCallback page stores token + user in localStorage, redirects to `/`

### Key Files

| File | Purpose |
|---|---|
| `server.js:14-17` | Google OAuth client config — reads `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `FRONTEND_URL` from `.env` |
| `server.js:309-321` | `GET /api/auth/google` — generates and redirects to Google OAuth URL |
| `server.js:323-356` | `GET /api/auth/google/callback` — exchanges code, decodes id_token, creates user, redirects to frontend |
| `src/pages/LoginPage.tsx:110-123` | "Continue with Google" button — `<a href="/api/auth/google">` |
| `src/pages/SignupPage.tsx:113-124` | Same button on signup page |
| `src/pages/AuthCallback.tsx` | Reads `token` and `user` from URL params, stores in localStorage, navigates to `/` |
| `.env` | Contains `VITE_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `FRONTEND_URL` |

### Cert Verification Issue
`google-auth-library`'s `verifyIdToken()` tries to fetch Google's public certificates from `https://www.googleapis.com/oauth2/v1/certs`. This failed with a TLS/network error. Fix: replaced `verifyIdToken()` with manual JWT decoding:
```js
// server.js line 333 (before)
const ticket = await googleClient.verifyIdToken({ idToken: tokens.id_token, audience: GOOGLE_CLIENT_ID });
const payload = ticket.getPayload();

// server.js line 333 (after)
const payload = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64').toString());
```
The token is already trusted because it was obtained via `googleClient.getToken(code)` which validated the authorization code with Google's OAuth endpoint over HTTPS.

### Google Cloud Console Setup
For this to work, add the following to your OAuth 2.0 client in Google Cloud Console under **Authorized redirect URIs**:
```
http://localhost:3001/api/auth/google/callback
```
For production (Netlify), you'd need a backend deployed somewhere (Render, Railway, etc.) and the appropriate redirect URI registered.

### Other Auth Methods
Email/password sign-in works through `POST /api/auth/register` and `POST /api/auth/login` on the backend, using bcrypt for password hashing and JWT for sessions.

### Current Client ID
The `.env` file (not tracked in git) contains:
- `VITE_GOOGLE_CLIENT_ID`: `510859691220-4bvllipioerrgmfenq1t0ubab1o85ems.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET`: in `.env` only (not committed)
- `GOOGLE_REDIRECT_URI`: `http://localhost:3001/api/auth/google/callback`
