export async function initiateGoogleLogin(): Promise<void> {
  const mockUser = {
    id: `google-${Date.now()}`,
    firstName: 'Google',
    lastName: 'User',
    email: 'google-user@demo.com',
    avatar: `https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff&size=200`,
    role: 'user',
  };

  localStorage.setItem('user', JSON.stringify(mockUser));
  localStorage.setItem('token', `google-mock-${Date.now()}`);
  window.location.href = '/';
}
