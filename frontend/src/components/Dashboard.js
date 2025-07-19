import React, { useEffect, useState } from 'react';
import CalendarWidget from './CalendarWidget';
import { FaSearch } from 'react-icons/fa';
import { FaTasks, FaBook, FaLink, FaCalendarAlt, FaTicketAlt, FaTachometerAlt } from 'react-icons/fa';

import '../styles/App.css';
// import '../styles/dashboard.css';

function Dashboard({ user }) {
  const [search, setSearch] = useState('');
  const [summary, setSummary] = useState({
    pendientes: [],
    recursos: [],
    tickets: [],
    eventos: [],
    actividades: []
  });

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      const params = search ? `?q=${encodeURIComponent(search)}` : '';
      const [pend, rec, tic, eve, act] = await Promise.all([
        fetch(`${url}/api/pendientes${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(()=>[]),
        fetch(`${url}/api/resources${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(()=>[]),
        fetch(`${url}/api/tickets${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(()=>[]),
        fetch(`${url}/api/events${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(()=>[]),
        fetch(`${url}/api/actividades${params}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(()=>[])
      ]);
      setSummary({ pendientes: pend, recursos: rec, tickets: tic, eventos: eve, actividades: act });
    }
    fetchData();
  }, [search]);

  return (
    <div className="dashboard-container" style={{width:'100%', borderRadius:0, background:'var(--color-bg)'}}>
        <h2><FaTachometerAlt style={{marginRight:8, color:'#1976d2'}} /> Dashboard</h2>
        
      <div className="dashboard-search">
        <input
          className="form-control"
          type="text"
          placeholder="Buscar por texto, tags, tipo, fecha..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="form-btn" type="button">
          <FaSearch size={28} />
        </button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-widget">
          
          <CalendarWidget eventos={summary.eventos} />
        </div>
        <div className="dashboard-widget">
          <h3><FaCalendarAlt /> Próximos eventos</h3>
          <ul className="dashboard-list">{summary.eventos.map((e, i) => <li key={i}>{e.title || e.titulo} <span>{e.startDate ? new Date(e.startDate).toLocaleDateString() : ''}</span></li>)}</ul>
        </div>
        <div className="dashboard-widget">
          <h3><FaTasks /> Pendientes del día</h3>
          <ul className="dashboard-list">{summary.pendientes.map((p, i) => <li key={i}>{p.titulo || p.descripcion}</li>)}</ul>
        </div>
        <div className="dashboard-widget">
          <h3><FaBook /> Últimos recursos</h3>
          <ul className="dashboard-list">{summary.recursos.map((r, i) => <li key={i}>{r.titulo}</li>)}</ul>
        </div>
        <div className="dashboard-widget">
          <h3><FaTicketAlt /> Tickets abiertos</h3>
          <ul className="dashboard-list">{summary.tickets.map((t, i) => <li key={i}>{t.descripcion} <span>({t.estado})</span></li>)}</ul>
        </div>
        <div className="dashboard-widget">
          <h3><FaLink /> Actividades recientes</h3>
          <ul className="dashboard-list">{summary.actividades.map((a, i) => <li key={i}>{a.descripcion || a.titulo}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
