import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

function Layout({ user, tab, setTab, children }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar tab={tab} setTab={setTab} user={user} handleLogout={handleLogout} />
        <div className="main-content">
          <Header user={user} />
          <div className="content-area">{children}</div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
