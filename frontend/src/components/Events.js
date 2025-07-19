import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';

function Events({ user }) {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', startDate: '', endDate: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${url}/api/events`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('No se pudieron cargar los eventos');
    }
    setLoading(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${url}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al crear evento');
      setForm({ title: '', description: '', startDate: '', endDate: '', location: '' });
      fetchEvents();
    } catch (err) {
      setError('No se pudo crear el evento');
    }
    setLoading(false);
  }

  return (
    <div className="events-container">
      <h2><FaCalendarAlt /> Eventos</h2>
      <form className="event-form" onSubmit={handleCreate}>
        <input type="text" placeholder="Título" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="form-control" />
        <input type="text" placeholder="Descripción" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <input type="datetime-local" placeholder="Inicio" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} required />
        <input type="datetime-local" placeholder="Fin" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} required />
        <input type="text" placeholder="Lugar" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        <button type="submit" disabled={loading} className="form-btn"><FaPlus /> Crear evento</button>
      </form>
      {error && <div className="event-error">{error}</div>}
      <table className="events-table modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.id}>
              <td>{ev.id}</td>
              <td>{ev.title}</td>
              <td>{ev.startDate ? new Date(ev.startDate).toLocaleString() : ''}</td>
              <td>{ev.endDate ? new Date(ev.endDate).toLocaleString() : ''}</td>
              <td>{ev.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
