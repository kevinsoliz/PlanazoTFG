# Planazo — Plan de Implementacion

## Fase 0: Estructura del proyecto

### 0.1 Monorepo
- [ ] Crear carpeta `frontend/` y mover Next.js dentro
- [ ] Crear carpeta `backend/` con Express + TypeScript
- [ ] Crear `docker-compose.yml` con servicios: frontend, backend, postgresql
- [ ] Configurar variables de entorno para cada servicio

### 0.2 Base de datos
- [ ] Fichero SQL de inicializacion (`backend/sql/init.sql`)
- [ ] Tabla `users` (id, nombre, email, password_hash, created_at)
- [ ] Tabla `sessions` (gestionada por express-session + connect-pg-simple)
- [ ] Conexion desde Express a PostgreSQL con `pg`

---

## Fase 1: Autenticacion (Sesiones de Express)

### 1.1 Configuracion de sesiones
- [ ] Instalar dependencias: `express-session`, `connect-pg-simple`, `bcrypt`
- [ ] Configurar express-session con almacenamiento en PostgreSQL
- [ ] Middleware de sesion en Express

### 1.2 Registro e inicio de sesion
- [ ] Endpoint `POST /api/auth/registro` (crear usuario, hashear password con bcrypt)
- [ ] Endpoint `POST /api/auth/login` (verificar credenciales, crear sesion)
- [ ] Endpoint `POST /api/auth/logout` (destruir sesion)
- [ ] Endpoint `GET /api/auth/me` (devolver usuario actual si hay sesion)
- [ ] Pagina `/registro` en Next.js con formulario
- [ ] Pagina `/login` en Next.js con formulario
- [ ] Redireccion post-login a `/planes`

### 1.3 Proteccion de rutas
- [ ] Middleware en Express que proteja endpoints privados
- [ ] En Next.js: verificar sesion antes de mostrar paginas privadas
- [ ] Redirigir usuarios no autenticados a `/login`

### 1.4 Logout
- [ ] Boton de cerrar sesion en el Navbar
- [ ] Destruir sesion y redirigir a `/`

---

## Fase 2: Perfil de usuario

### 2.1 Modelo de datos
- [ ] Tabla `profiles` (id, user_id, nombre, avatar_url, descripcion, created_at)
- [ ] Crear perfil automaticamente al registrarse (en el endpoint de registro)

### 2.2 Endpoints
- [ ] `GET /api/profiles/:id` — obtener perfil
- [ ] `PUT /api/profiles/:id` — editar perfil (solo propietario)

### 2.3 Paginas
- [ ] Pagina `/perfil` — ver y editar perfil propio
- [ ] Pagina `/perfil/[id]` — ver perfil de otro usuario
- [ ] Formulario de edicion (nombre, descripcion, avatar)

---

## Fase 3: Planes (CRUD)

### 3.1 Modelo de datos
- [ ] Tabla `plans` (id, creator_id, titulo, categoria, descripcion, fecha, ubicacion, aforo_max, created_at)
- [ ] Tabla `plan_participants` (plan_id, user_id, joined_at)
- [ ] Categorias predefinidas: Aventura, Cultura, Deporte, Musica, Gastronomia, Ocio, Otros

### 3.2 Endpoints
- [ ] `POST /api/plans` — crear plan (verificar sesion, limite 3 activos)
- [ ] `GET /api/plans` — listar planes (con filtro por categoria)
- [ ] `GET /api/plans/:id` — detalle de un plan
- [ ] `POST /api/plans/:id/join` — unirse a un plan (verificar aforo)
- [ ] `DELETE /api/plans/:id/join` — salirse de un plan

### 3.3 Paginas
- [ ] Pagina `/planes` con grid de tarjetas
- [ ] Pagina `/planes/crear` con formulario
- [ ] Pagina `/planes/[id]` con detalle, participantes, boton unirse/salirse
- [ ] Filtro por categoria
- [ ] Ordenar por fecha (proximos primero)

---

## Fase 4: Seguridad basica

- [ ] Verificacion de email obligatoria para crear planes
- [ ] Validacion de campos en cliente y servidor
- [ ] Queries parametrizadas en todas las consultas SQL ($1, $2...)
- [ ] Rate limiting basico en acciones criticas
- [ ] Hasheo de passwords con bcrypt (nunca almacenar en texto plano)

---

## Orden de trabajo sugerido

| Orden | Tarea                          | Rama sugerida         |
|-------|--------------------------------|-----------------------|
| 1     | Estructura monorepo + Docker   | `feature/monorepo`    |
| 2     | Setup Express + PostgreSQL     | `feature/backend`     |
| 3     | Auth (registro, login, sesion) | `feature/auth`        |
| 4     | Perfil de usuario              | `feature/perfil`      |
| 5     | CRUD de planes                 | `feature/planes`      |
| 6     | Inscripcion a planes           | `feature/planes`      |
| 7     | Filtros y listado              | `feature/planes`      |
| 8     | Seguridad y validaciones       | `feature/seguridad`   |

---

## Dependencias

### Backend
```bash
npm install express express-session connect-pg-simple pg bcrypt cors
npm install -D typescript @types/express @types/express-session @types/pg @types/bcrypt @types/cors ts-node nodemon
```

### Frontend
```bash
# Ya instalado: Next.js, React, TypeScript, Tailwind, DaisyUI
```

## Variables de entorno

### Backend (.env)
```env
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/planazo
SESSION_SECRET=tu_secreto_aqui
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
