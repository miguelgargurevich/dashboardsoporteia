import React, { useEffect, useState } from 'react';
import { FaBook, FaPlus } from 'react-icons/fa';

function KB({ user }) {
  const [kbs, setKbs] = useState([]);
  const [form, setForm] = useState({ titulo: '', tipo: 'Manual', categoria: '', descripcion: '', contenido: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchKbs();
  }, []);

  async function fetchKbs() {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${url}/api/kb`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setKbs(data);
    } catch (err) {
      setError('No se pudieron cargar los artículos');
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
      const res = await fetch(`${url}/api/kb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al crear artículo');
      setForm({ titulo: '', tipo: 'Manual', categoria: '', descripcion: '', contenido: '' });
      fetchKbs();
    } catch (err) {
      setError('No se pudo crear el artículo');
    }
    setLoading(false);
  }

  return (
    <div className="kb-container">
      <h2><FaBook /> Base de Conocimientos</h2>
      <form className="kb-form" onSubmit={handleCreate}>
        <input type="text" placeholder="Título" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required />
        <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}>
          <option value="Manual">Manual</option>
          <option value="Procedimiento">Procedimiento</option>
        </select>
        <input type="text" placeholder="Categoría" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} />
        <input type="text" placeholder="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
        <textarea placeholder="Contenido" value={form.contenido} onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))} rows={3} />
        <button type="submit" disabled={loading}><FaPlus /> Crear artículo</button>
      </form>
      {error && <div className="kb-error">{error}</div>}
      <table className="kb-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {kbs.map(kb => (
            <tr key={kb.id}>
              <td>{kb.id}</td>
              <td>{kb.titulo}</td>
              <td>{kb.tipo}</td>
              <td>{kb.categoria}</td>
              <td>{kb.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KB;
