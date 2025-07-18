import { FaTachometerAlt, FaTicketAlt, FaBook, FaLink, FaCalendarAlt, FaBars, FaChevronLeft, FaSignOutAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ tab, setTab, user }) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}> 
      <button className="sidebar-toggle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '2.5rem', marginTop: '1.0rem'}} onClick={() => setCollapsed(c => !c)}>
        {collapsed ? <FaBars /> : <FaChevronLeft />}
      </button>
      <nav style={{marginTop:'1.5rem', marginLeft:'0.5rem'}}>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li><button style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start', 
            width: '100%',
            paddingLeft: collapsed ? 0 : '0.5rem',
            paddingRight: collapsed ? 0 : '0.5rem'
          }} onClick={() => setTab('dashboard')}>
            <span style={{width: 32, display: 'flex', justifyContent: 'center'}}><FaTachometerAlt /></span>
            {!collapsed ? <span style={{marginLeft:8}}>Dashboard</span> : null}
          </button></li>
          <li><button style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start', 
            width: '100%',
            paddingLeft: collapsed ? 0 : '0.5rem',
            paddingRight: collapsed ? 0 : '0.5rem'
          }} onClick={() => setTab('tickets')}>
            <span style={{width: 32, display: 'flex', justifyContent: 'center'}}><FaTicketAlt /></span>
            {!collapsed ? <span style={{marginLeft:8}}>Tickets</span> : null}
          </button></li>
          <li><button style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start', 
            width: '100%',
            paddingLeft: collapsed ? 0 : '0.5rem',
            paddingRight: collapsed ? 0 : '0.5rem'
          }} onClick={() => setTab('kb')}>
            <span style={{width: 32, display: 'flex', justifyContent: 'center'}}><FaBook /></span>
            {!collapsed ? <span style={{marginLeft:8}}>KB</span> : null}
          </button></li>
          <li><button style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start', 
            width: '100%',
            paddingLeft: collapsed ? 0 : '0.5rem',
            paddingRight: collapsed ? 0 : '0.5rem'
          }} onClick={() => setTab('resources')}>
            <span style={{width: 32, display: 'flex', justifyContent: 'center'}}><FaLink /></span>
            {!collapsed ? <span style={{marginLeft:8}}>Recursos</span> : null}
          </button></li>
          <li><button style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: collapsed ? 'center' : 'flex-start', 
            width: '100%',
            paddingLeft: collapsed ? 0 : '0.5rem',
            paddingRight: collapsed ? 0 : '0.5rem'
          }} onClick={() => setTab('events')}>
            <span style={{width: 32, display: 'flex', justifyContent: 'center'}}><FaCalendarAlt /></span>
            {!collapsed ? <span style={{marginLeft:8}}>Eventos</span> : null}
          </button></li>
        </ul>
      </nav>
      <div style={{flex: 1}}></div>
      <button 
        className="logout-btn" 
        onClick={handleLogout} 
        style={{
          width:'100%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:'0.7rem 0',
          fontSize: collapsed ? '1.7rem' : '1rem',
          paddingLeft: collapsed ? 0 : '0.5rem',
          paddingRight: collapsed ? 0 : '0.5rem'
        }}>
        {collapsed ? <FaSignOutAlt /> : 'Cerrar sesión'}
      </button>
    </aside>
  );
};

export default Sidebar;
