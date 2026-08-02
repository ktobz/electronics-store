import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token && user) {
      try {
        const userData = JSON.parse(decodeURIComponent(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/', { replace: true });
      } catch {
        navigate('/login?error=Failed+to+parse+user+data', { replace: true });
      }
    } else if (token && !user) {
      localStorage.setItem('token', token);
      navigate('/', { replace: true });
    } else {
      const existing = localStorage.getItem('token');
      if (existing) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
    setLoading(false);
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p>Completing authentication...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
