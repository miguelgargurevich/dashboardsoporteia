import React from 'react';
import Login from '../components/Login';
import '../styles/Login.css';
import '../styles/App.css';
import { FaRobot } from 'react-icons/fa';

function LoginPage({ onLogin }) {
  return (
    <div className="loginpage-grid">
      <div className="loginpage-left">
        <Login onLogin={onLogin} />
      </div>
      <div className="loginpage-right" style={{maxWidth:'400px',margin:'0 auto',background:'var(--color-bg)',boxShadow:'0 4px 24px rgba(44,62,80,0.13)',padding:'2rem 2rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className="loginpage-img" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'160px'}}>
          <FaRobot size={110} color="#1976d2" className="robot-animate" />
        </div>
        <div className="loginpage-desc" style={{width:'100%',textAlign:'center',paddingRight:'0.5rem',boxSizing:'border-box'}}>
          <h2>Soporte Técnico IA</h2>
          <p>Soluciones inteligentes para tu empresa. Accede a tickets, recursos, base de conocimiento y eventos desde un solo lugar.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
