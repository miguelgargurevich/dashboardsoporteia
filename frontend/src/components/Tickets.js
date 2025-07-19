import React, { useEffect, useState } from 'react';
import { FaPlus, FaCheck, FaTimes, FaTicketAlt } from 'react-icons/fa';

function Tickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const ticketsPerPage = 10;
  const [form, setForm] = useState({ tipo: 'Incidente', descripcion: '', sistema: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${url}/api/tickets`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError('No se pudieron cargar los tickets');
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
      const res = await fetch(`${url}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al crear ticket');
      setForm({ tipo: 'Incidente', descripcion: '', sistema: '' });
      fetchTickets();
    } catch (err) {
      setError('No se pudo crear el ticket');
    }
    setLoading(false);
  }

  // Calcular los tickets a mostrar en la página actual
  const startIdx = (page - 1) * ticketsPerPage;
  const endIdx = startIdx + ticketsPerPage;
  const paginatedTickets = tickets.slice(startIdx, endIdx);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  return (
    <div className="tickets-container" style={{width:'100%', borderRadius:0, background:'var(--color-bg)'}}>
      <h2><FaTicketAlt style={{marginRight:8, color:'#1976d2'}} /> Tickets</h2>
      <form className="ticket-form" onSubmit={handleCreate}>
        <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} className="form-control">
          <option value="Incidente">Incidente</option>
          <option value="Requerimiento">Requerimiento</option>
        </select>
        <input type="text" placeholder="Sistema" value={form.sistema} onChange={e => setForm(f => ({ ...f, sistema: e.target.value }))} required className="form-control" />
        <input type="text" placeholder="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} required className="form-control" />
        <button type="submit" disabled={loading} className="form-btn"><FaPlus style={{marginRight:6}} /> Crear ticket</button>
      </form>
      {error && <div className="ticket-error">{error}</div>}
      <table className="tickets-table modern-table">
        <thead>
          <tr>
            <th><FaTicketAlt style={{marginRight:4}} /> ID</th>
            <th>Tipo</th>
            <th>Sistema</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTickets.map(t => (
            <tr key={t.id} className={t.estado === 'Cerrado' ? 'ticket-cerrado' : 'ticket-abierto'}>
              <td><FaTicketAlt className="icon" /> {t.id}</td>
              <td>{t.tipo}</td>
              <td>{t.sistema}</td>
              <td>{t.descripcion}</td>
              <td>{t.estado === 'Cerrado' ? <FaCheck className="icon" color="#388e3c" /> : <FaTimes className="icon" color="#1976d2" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'1rem',marginTop:'1.5rem'}}>
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{padding:'0.5rem 1rem',borderRadius:'8px',border:'none',background:'#1976d2',color:'#fff',cursor:'pointer',fontWeight:'bold'}}>Anterior</button>
          <span style={{fontWeight:'bold'}}>Página {page} de {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} style={{padding:'0.5rem 1rem',borderRadius:'8px',border:'none',background:'#1976d2',color:'#fff',cursor:'pointer',fontWeight:'bold'}}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default Tickets;
