import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Temporary fix: Use mock authentication until real Supabase is set up
const supabaseUrl = (process as any).env.REACT_APP_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = (process as any).env.REACT_APP_SUPABASE_ANON_KEY || 'demo-key';

// Mock user data for testing
const mockUsers = [
  {
    id: 'mock-user-1',
    email: 'demo@example.com',
    user_metadata: { name: 'Demo User' },
    app_metadata: { provider: 'google' }
  }
];

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

// Mock authentication functions for testing
export const signUp = async (email: string, password: string, name?: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: `mock-${Date.now()}`,
      email,
      user_metadata: { name: name || email.split('@')[0] },
      app_metadata: { provider: 'email' }
    };

    return { user: mockUser, session: { user: mockUser } };
  } catch (error) {
    console.error('Mock signup error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: `mock-${Date.now()}`,
      email,
      user_metadata: { name: email.split('@')[0] },
      app_metadata: { provider: 'email' }
    };

    return { user: mockUser, session: { user: mockUser } };
  } catch (error) {
    console.error('Mock signin error:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create mock Google user
    const mockGoogleUser = {
      id: `google-${Date.now()}`,
      email: `user${Date.now()}@gmail.com`,
      user_metadata: { 
        name: 'Google User',
        avatar_url: 'https://ui-avatars.com/api/?name=Google+User&background=random'
      },
      app_metadata: { provider: 'google' }
    };

    // Simulate redirect to auth callback
    setTimeout(() => {
      window.location.href = '/auth/callback';
    }, 1000);

    return { user: mockGoogleUser, session: { user: mockGoogleUser } };
  } catch (error) {
    console.error('Mock Google signin error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    // Simulate sign out
    await new Promise(resolve => setTimeout(resolve, 500));
    return { error: null };
  } catch (error) {
    console.error('Mock signout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    // Check for mock session in localStorage
    const mockSession = localStorage.getItem('mockUserSession');
    if (mockSession) {
      return JSON.parse(mockSession);
    }
    return null;
  } catch {
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { email }, error: null };
  } catch (error) {
    console.error('Mock reset password error:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  // Mock auth state change listener
  const mockUser = localStorage.getItem('mockUserSession');
  if (mockUser) {
    callback('SIGNED_IN', JSON.parse(mockUser));
  }
  
  return {
    data: {
      subscription: {
        unsubscribe: () => {}
      }
    }
  };
};

export const updatePassword = async (password: string) => {
  try {
    // Simulate password update
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { error: null };
  } catch (error) {
    console.error('Mock update password error:', error);
    throw error;
  }
};
