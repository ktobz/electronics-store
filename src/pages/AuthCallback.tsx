import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // For mock authentication, create a mock Google user
        const mockGoogleUser = {
          id: `google-${Date.now()}`,
          email: `google.user${Date.now()}@gmail.com`,
          user_metadata: { 
            name: 'Google User',
            avatar_url: 'https://ui-avatars.com/api/?name=Google+User&background=random'
          },
          app_metadata: { provider: 'google' }
        };

        // Store mock session
        localStorage.setItem('mockUserSession', JSON.stringify(mockGoogleUser));
        
        console.log('Mock Google authentication successful!');
        
        // Navigate to home page after successful authentication
        setTimeout(() => {
          navigate('/');
        }, 1000);
        
      } catch (err) {
        console.error('Callback error:', err);
        setError('An error occurred during authentication.');
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3', 
          borderTop: '4px solid #3498db', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <p>Completing Google authentication...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ color: 'red', fontSize: '18px' }}>
          Authentication Error
        </div>
        <p>{error}</p>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
