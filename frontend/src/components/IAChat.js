import React, { useState, useRef, useEffect } from 'react';
import '../styles/iachat.css';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const initialPrompt = `¡Hola! Soy tu asistente IA para el Dashboard de Soporte Técnico.
Puedo ayudarte con:
- Registrar y clasificar tickets, recursos, KBs y eventos
- Sugerir artículos y soluciones
- Buscar información por texto, tags, tipo, fecha
- Relacionar elementos entre sí
- Responder preguntas técnicas y de productividad
- Crear eventos y notas
¡Escríbeme lo que necesitas!`;

function IAChat({ user }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: initialPrompt }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: newMessages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
        })
      });
      const data = await res.json();
      const aiMsg = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta.';
      setMessages(msgs => [...msgs, { role: 'assistant', content: aiMsg }]);
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'Error al conectar con IA.' }]);
    }
    setLoading(false);
  }

  return (
    <>
      <button className="iachat-fab" onClick={() => { setOpen(true); setClosing(false); }}>
        <FaRobot size={28} />
      </button>
      {(open || closing) && (
        <div className={`iachat-window${open && !closing ? ' open' : ''}${closing ? ' close' : ''}`}>
          <div className="iachat-header">
            <span>Asistente IA</span>
            <button
              onClick={() => {
                setClosing(true);
                setTimeout(() => {
                  setOpen(false);
                  setClosing(false);
                }, 400);
              }}
              style={{
                background:'#f3f4f6',
                border:'none',
                borderRadius:'50%',
                width:'2rem',
                height:'2rem',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer',
                transition:'background 0.2s',
                boxShadow:'0 1px 4px rgba(0,0,0,0.08)'
              }}
              onMouseOver={e => e.currentTarget.style.background = '#ffe0e0'}
              onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
            >
              <FaTimes style={{color:'#4fc3f7',fontSize:'1.2rem'}} />
            </button>
          </div>
          <div className="iachat-messages" ref={chatRef}>
            {messages.map((m, i) => (
              <div key={i} className={`iachat-msg iachat-${m.role}`}>{m.content}</div>
            ))}
            {loading && <div className="iachat-msg iachat-assistant">Pensando...</div>}
          </div>
          <form className="iachat-form" onSubmit={sendMessage}>
            <input
              className="form-control"
              type="text"
              placeholder="Escribe tu consulta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button type="submit" className="form-btn" disabled={loading || !input.trim()}><FaPaperPlane /></button>
          </form>
        </div>
      )}
    </>
  );
}

export default IAChat;
