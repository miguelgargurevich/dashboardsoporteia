# Dashboard Soporte IA

Dashboard web para gestión personal de soporte técnico, productividad y asistencia inteligente.

## Características funcionales

- **Gestión de tickets:** Alta, edición, seguimiento y cierre de tickets de soporte.
- **Base de conocimientos (KB):** Artículos, sugerencias y búsqueda avanzada por texto, tags y tipo.
- **Recursos:** Registro y organización de recursos técnicos, enlaces y documentos.
- **Agenda y calendario:** Visualización mensual, eventos, actividades y recordatorios.
- **Asistente IA:** Chat integrado para consultas, sugerencias, búsqueda y automatización de tareas.
- **Buscador inteligente:** Filtros y sugerencias IA en tickets, KB y recursos.
- **Autenticación:** Login con usuario demo y JWT, preparado para OAuth Google.
- **Interfaz moderna:** Diseño glassmorphism, responsivo, dark mode y accesibilidad.

## Características técnicas

- **Frontend:** React, Zustand, Tailwind, CSS custom, componentes modulares.
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL.
- **API REST:** Endpoints para tickets, KB, recursos, eventos, usuarios y autenticación.
- **IA:** Integración con Gemini API (actual) y OpenAI GPT-4o (planificado).
- **Calendario:** Widget propio y preparado para FullCalendar.io y date-fns.
- **Seed y migraciones:** Prisma para modelos, migraciones y datos demo.
- **.env:** Variables de entorno para claves, URLs y secretos.
- **Responsive:** Grid adaptable, cards y widgets optimizados para móvil/tablet.
- **Git:** `.gitignore` para carpetas pesadas, builds, logs, bases de datos y archivos temporales.

## Estructura del proyecto

```
backend/        # API, modelos, migraciones, seed
frontend/       # React, componentes, estilos, assets
  src/
    components/ # Dashboard, Tickets, KB, IAChat, etc
    styles/     # CSS y temas
    pages/      # Vistas principales
  public/       # index.html y assets
  .env          # Variables frontend
backend/.env    # Variables backend
```

## Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/miguelgargurevich/dashboardsoporteia.git
   ```
2. Instalar dependencias:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Configurar `.env` en backend y frontend (ver ejemplos en cada carpeta).
4. Ejecutar backend:
   ```bash
   cd backend && npm start
   ```
5. Ejecutar frontend:
   ```bash
   cd frontend && npm start
   ```

## Roadmap y mejoras

- Integración completa con OpenAI GPT-4o y Google OAuth/Drive.
- Subida y gestión de archivos adjuntos.
- Mejoras en accesibilidad y dark mode.
- Sugerencias IA en todos los módulos.
- Integración avanzada de calendario y notificaciones.

## Autor

Miguel Gargurevich
[github.com/miguelgargurevich/dashboardsoporteia](https://github.com/miguelgargurevich/dashboardsoporteia)
