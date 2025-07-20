import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import { useEffect } from 'react';
import { useAuth } from './utils/AuthContext';
import OAuthRedirect from './pages/OAuthRedirect';



function App() {

  const { checkUserStatus } = useAuth();

  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/auth-redirect" element={<OAuthRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/order" element={<OrderPage />} />
      
    </Routes>
  );
}

export default App;
