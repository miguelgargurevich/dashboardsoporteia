import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <header className="header">
      <h2>Bienvenido, {user?.name || 'Usuario'}</h2>
    </header>
  );
};

export default Header;
