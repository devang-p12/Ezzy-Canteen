// src/pages/OAuthRedirect.jsx
import { useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const OAuthRedirect = () => {
  const { checkUserStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const sync = async () => {
      await checkUserStatus();
      navigate('/');
    };
    sync();
  }, []);

  return <p className="text-center mt-10">Logging in with Google...</p>;
};

export default OAuthRedirect;
