import React, { useEffect, useState } from 'react';
import { FaLink, FaPlus } from 'react-icons/fa';

function Resources({ user }) {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ tipo: 'enlace', titulo: '', url: '', descripcion: '', categoria: '', tags: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    try {
      const res = await fetch(`${url}/api/resources`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setResources(data);
    } catch (err) {
      setError('No se pudieron cargar los recursos');
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
      const res = await fetch(`${url}/api/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()) })
      });
      if (!res.ok) throw new Error('Error al crear recurso');
      setForm({ tipo: 'enlace', titulo: '', url: '', descripcion: '', categoria: '', tags: '' });
      fetchResources();
    } catch (err) {
      setError('No se pudo crear el recurso');
    }
    setLoading(false);
  }

  return (
    <div className="resources-container">
      <h2><FaLink /> Recursos</h2>
      <form className="resource-form" onSubmit={handleCreate}>
        <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}>
          <option value="enlace">Enlace</option>
          <option value="archivo">Archivo</option>
          <option value="nota">Nota</option>
          <option value="video">Video</option>
        </select>
        <input type="text" placeholder="Título" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required className="form-control" />
        <input type="text" placeholder="URL o ruta de archivo" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} />
        <input type="text" placeholder="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
        <input type="text" placeholder="Categoría" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} />
        <input type="text" placeholder="Tags (separados por coma)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
        <button type="submit" disabled={loading} className="form-btn"><FaPlus /> Crear recurso</button>
      </form>
      {error && <div className="resource-error">{error}</div>}
      <table className="resources-table modern-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.tipo}</td>
              <td>{r.titulo}</td>
              <td>{r.categoria}</td>
              <td>{Array.isArray(r.tags) ? r.tags.join(', ') : r.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resources;
