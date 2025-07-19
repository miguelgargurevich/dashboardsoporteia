import React, { useState } from 'react';
import './styles/App.css';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import IAChat from './components/IAChat';
import Dashboard from './components/Dashboard';
import Tickets from './components/Tickets';
import KB from './components/KB';
import Resources from './components/Resources';
import Events from './components/Events';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [tab, setTab] = useState('dashboard');

  const handleLogin = (data) => {
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  // Renderizado condicional según rol
  let content;
  if (tab === 'dashboard') content = <Dashboard user={user} />;
  else if (tab === 'tickets') content = <Tickets user={user} />;
  else if (tab === 'kb') content = <KB user={user} />;
  else if (tab === 'resources') content = <Resources user={user} />;
  else if (tab === 'events') content = <Events user={user} />;

  return (
    <>
      <Layout user={user} tab={tab} setTab={setTab} handleLogout={handleLogout}>
        {content}
      </Layout>
      <IAChat user={user} />
    </>
  );
}

export default App;
