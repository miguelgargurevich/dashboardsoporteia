import React, { useState } from 'react';
import { FaTasks, FaBook, FaLink, FaCalendarAlt, FaTicketAlt, FaTachometerAlt } from 'react-icons/fa';

function getMonthDays(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function CalendarWidget({ eventos }) {
  const handleGoToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(null);
  };
  const [selectedDay, setSelectedDay] = useState(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const days = getMonthDays(currentYear, currentMonth);
  const eventosDelMes = (eventos || []).filter(e => {
    const d = new Date(e.startDate || e.fecha || e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const eventosPorDia = {};
  eventosDelMes.forEach(e => {
    const d = new Date(e.startDate || e.fecha || e.date);
    const key = d.getDate();
    if (!eventosPorDia[key]) eventosPorDia[key] = [];
    eventosPorDia[key].push(e);
  });
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const firstDay = days[0].getDay();

  const handleDayClick = (dayNum) => {
    if (eventosPorDia[dayNum]) {
      setSelectedDay(dayNum);
    } else {
      setSelectedDay(null);
    }
  };

  const handlePrevMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  return (
    <div className="calendar-widget">
      <div className="calendar-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <h3 style={{margin:0}}><FaCalendarAlt style={{marginRight:'0.5rem'}} /> {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h3>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <button onClick={handlePrevMonth} style={{
            background:'#e3eafc',
            border:'none',
            fontSize:'1.5rem',
            cursor:'pointer',
            color:'#1976d2',
            fontWeight:'bold',
            borderRadius:'50%',
            width:'2.5rem',
            height:'2.5rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow:'0 1px 4px rgba(25,118,210,0.08)'
          }}>&lt;</button>
          <button onClick={handleNextMonth} style={{
            background:'#e3eafc',
            border:'none',
            fontSize:'1.5rem',
            cursor:'pointer',
            color:'#1976d2',
            fontWeight:'bold',
            borderRadius:'50%',
            width:'2.5rem',
            height:'2.5rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            boxShadow:'0 1px 4px rgba(25,118,210,0.08)'
          }}>&gt;</button>
          <button onClick={handleGoToday} style={{background:'#1976d2',border:'none',color:'#fff',fontSize:'1rem',fontWeight:'bold',borderRadius:'8px',padding:'0.3rem 1rem',cursor:'pointer'}}>Hoy</button>
        </div>
      </div>
      <div className="calendar-grid">
        {weekDays.map((wd, i) => (
          <div key={i} className="calendar-cell calendar-weekday">{wd}</div>
        ))}
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={'empty-'+i} className="calendar-cell empty"></div>
        ))}
        {days.map((d, i) => {
          const dayNum = d.getDate();
          const hasEvent = !!eventosPorDia[dayNum];
          return (
            <div
              key={i}
              className={`calendar-cell${hasEvent ? ' event' : ''}${selectedDay === dayNum ? ' selected' : ''}`}
              onClick={() => handleDayClick(dayNum)}
              style={{ cursor: hasEvent ? 'pointer' : 'default', border: selectedDay === dayNum ? '2px solid #1976d2' : 'none' }}
            >
              <span>{dayNum}</span>
              {hasEvent && <span className="calendar-dot"></span>}
            </div>
          );
        })}
      </div>
      <div className="calendar-events-list">
        {selectedDay && eventosPorDia[selectedDay] ? (
          <ul>
            {eventosPorDia[selectedDay].map((e, idx) => (
              <li key={idx}>
                <strong>{e.title || e.titulo}</strong><br/>
                {e.descripcion && <span>{e.descripcion}</span>}
                {e.startDate && <div><small>{new Date(e.startDate).toLocaleString()}</small></div>}
              </li>
            ))}
          </ul>
        ) : (
          Object.keys(eventosPorDia).length > 0 ? (
            <span></span>
          ) : <span>No hay eventos este mes.</span>
        )}
      </div>
    </div>
  );
}

export default CalendarWidget;
