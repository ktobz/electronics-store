import { createClient, SupabaseClient } from '@supabase/supabase-js';
import api from './api';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'demo-key';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

export const signUp = async (email: string, _password: string, name?: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: `mock-${Date.now()}`, email, user_metadata: { name: name || email.split('@')[0] }, app_metadata: { provider: 'email' } };
    return { user: mockUser, session: { user: mockUser } };
};

export const signIn = async (email: string, _password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser = { id: `mock-${Date.now()}`, email, user_metadata: { name: email.split('@')[0] }, app_metadata: { provider: 'email' } };
    return { user: mockUser, session: { user: mockUser } };
};

export const signInWithGoogle = async () => {
    const mockGoogleUser = {
        id: `google-${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        name: 'Google User',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=random',
        googleId: `google-id-${Date.now()}`
    };

    try {
        const response = await api.post('/auth/google', {
            email: mockGoogleUser.email,
            name: mockGoogleUser.name,
            avatar: mockGoogleUser.avatar,
            googleId: mockGoogleUser.googleId
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/';
        return response.data;
    } catch (err) {
        console.error('Google sign-in error:', err);
        throw err;
    }
};

export const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { error: null };
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const response = await api.get('/user/profile');
        return response.data;
    } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return null;
    }
};

export const resetPassword = async (email: string) => { return { data: { email }, error: null }; };
export const onAuthStateChange = () => ({ data: { subscription: { unsubscribe: () => {} } } });
export const updatePassword = async () => ({ error: null });
