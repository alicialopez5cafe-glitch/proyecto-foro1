import React, { useState } from 'react';
import { Home, User, BookOpen, FileText, LogOut, Settings, ChevronDown, ChevronRight, Menu } from 'lucide-react';

export default function App() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('Inicio');
  const [menuAbierto, setMenuAbierto] = useState<string | null>('null'); 
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Estructura del menú con subopciones desplegables
  const menuItems = [
    { nombre: 'Inicio', icono: <Home size={18} /> },
    {
      nombre: 'Mi Perfil',
      icono: <User size={18} />,
      subItems: ['Ver Perfil', 'Editar Información', 'Seguridad']
    },
    {
      nombre: 'Asignaturas',
      icono: <BookOpen size={18} />,
      subItems: ['Gestion Estrategica', 'Administracion de Base de Datos', 'Taller Desarrollo web', 'Desarrollo web en entorno servidor']
    },
    {
      nombre: 'Notas',
      icono: <FileText size={18} />,
      subItems: ['Parcial 1', 'Parcial 2', 'Nota Final']
    },
    { nombre: 'Configuración', icono: <Settings size={18} /> },
    { nombre: 'Cerrar sesión', icono: <LogOut size={18} /> },
  ];

  const datosTabla = [
    { nombre: 'Data Grid', descripcion: 'The Community version' },
    { nombre: 'Data Grid Pro', descripcion: 'The Pro version' },
    { nombre: 'Data Grid Premium', descripcion: 'The Premium version' },
  ];

  const toggleSubmenu = (nombre: string) => {
    setMenuAbierto(menuAbierto === nombre ? null : nombre);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: "'Inter', 'Poppins', sans-serif", backgroundColor: '#0f172a', color: '#f8fafc' }}>
    
      <header style={{ backgroundColor: '#9553bb', color: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Menu size={22} />
        </button>
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Mi Panel de Control</span>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Menú Lateral (Sidebar) Desplegable */}
      
          <aside style={{ 
              width: sidebarVisible ? '240px' : '0px',
              opacity: sidebarVisible ? 1 : 0,
              backgroundColor: '#1e293b',
              borderRight: sidebarVisible ? '1px solid #334155' : 'none', 
              padding: sidebarVisible ? '16px' : '0px', 
              overflowY: 'auto',
              overflowX: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              pointerEvents: sidebarVisible ? 'auto' : 'none'

            }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {menuItems.map((item) => {
                const tieneSubitems = item.subItems && item.subItems.length > 0;
                const estaDesplegado = menuAbierto === item.nombre;
                const esActivo = opcionSeleccionada === item.nombre;

                return (
                  <li key={item.nombre}>
                    <div
                      onClick={() => {
                        if (tieneSubitems) {
                          toggleSubmenu(item.nombre);
                        } else {
                          setOpcionSeleccionada(item.nombre);
                        }
                      }}
                      onMouseEnter={() => setHoveredItem(item.nombre)}
                      onMouseLeave={() => setHoveredItem(null)}

                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 20px',
                        fontSize: '0.9rem',
                        color: esActivo ? '#ffffff' : '#94a3b8',
                        backgroundColor: esActivo ? '#38bdf8' : (hoveredItem === item.nombre ? '#334155' : 'transparent'),
                        fontWeight: esActivo || estaDesplegado ? 'bold' : 'normal',
                        cursor: 'pointer',
                        transform: hoveredItem === item.nombre ? 'translateX(6px)' : 'translateX(0px)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.icono}
                        <span>{item.nombre}</span>
                      </div>
                      {tieneSubitems && (
                        estaDesplegado ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                      )}
                    </div>

                    {/* Submenú desplegable */}
                    {tieneSubitems && (
                      <ul 
                         style={{ 
                          listStyle: 'none',
                          padding: 0, 
                          margin: 0, 
                          backgroundColor: '#0f172a',
                          overflow:'hiden',
                          maxHeight:estaDesplegado ? '200px':'0px',
                          opacity:estaDesplegado ? 1: 0,
                          transition:'max-height 0.1s ease, opacity 0.1s ease',
                          pointerEvents: estaDesplegado ? 'auto' : 'none'
                           }}
                        >
                        {item.subItems.map((sub) => {
                          const esSubActivo = opcionSeleccionada === sub;
                          const esSubHovered = hoveredItem === sub;

                          const backgroundColorSub = esSubActivo
                          ? '#5c8497'
                          : (esSubHovered ? '#334155' : 'transparent');

                          return (
                            <li
                              key={sub}
                              onClick={() => setOpcionSeleccionada(sub)}
                              onMouseEnter={() => setHoveredItem(sub)}
                              onMouseLeave={() => setHoveredItem(null)}
                              style={{
                                padding: '8px 16px 8px 48px',
                                fontSize: '0.85rem',
                                color: esSubActivo ? '#1d3049' : '#828fa1',
                                backgroundColor: esSubActivo ? '#e3f2fd' : 'transparent',
                                fontWeight: esSubActivo ? '600' : 'normal',
                                cursor: 'pointer',
                                borderLeft: esSubActivo ? '3px solid #47606b' : '3px solid transparent',
                                textAlign: 'left',
                                transform: esSubHovered ? 'translateX(6px)': 'translateX(0px)',
                                transition: 'all 0.1s ease-out'
                              }}
                            >
                              {sub}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
      

        {/* Contenido Principal */}
        <main style={{ 
          flex: 1, 
          padding: '32px', 
          overflowY: 'auto'
          }}>
          <h2 style={{ marginTop: 0, fontSize: '1.5rem', color: '#f8fafc', marginBottom: '8px' }}>
            Datos del Perfil de Usuario
          </h2>
          <p style={{ color: '#616161', marginTop: 0, marginBottom: '24px', fontSize: '0.9rem' }}>
            Sección activa: <strong>{opcionSeleccionada}</strong>
          </p>

          {/* Tabla de Datos */}
          <div style={{ backgroundColor:'#0f172a', borderRadius: '4px', border: '1px solid #334155', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #331455', color: '#616161', backgroundColor: '#0f172a' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Product Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {datosTabla.map((row, index) => (
                  <tr key={index} style={{ borderBottom: index === datosTabla.length - 1 ? 'none' : '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px', color: '#e2e8f0' }}>{row.nombre}</td>
                    <td style={{ padding: '12px 16px', color: '#90aac9' }}>{row.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginador inferior */}
            <div style={{ padding: '8px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#616161' }}>
              <span>Rows per page: 100 ▾</span>
              <span>1–3 of 3</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}