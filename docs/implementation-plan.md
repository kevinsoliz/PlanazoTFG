# Planazo — Plan de Implementacion

## Fase 1: Autenticacion (Supabase Auth)

### 1.1 Configuracion de Supabase
- [ ] Crear proyecto en Supabase
- [ ] Configurar variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Instalar dependencias: `@supabase/supabase-js`, `@supabase/ssr`
- [ ] Crear cliente de Supabase para Server Components y Client Components
- [ ] Configurar middleware de Next.js para refrescar sesiones

### 1.2 Registro e inicio de sesion con email/password
- [ ] Pagina `/registro` con formulario (email, password, nombre)
- [ ] Pagina `/login` con formulario (email, password)
- [ ] Confirmacion de email (flujo de verificacion de Supabase)
- [ ] Pagina `/auth/callback` para manejar el callback de confirmacion
- [ ] Redireccion post-login a `/planes`

### 1.3 Autenticacion con Google (OAuth)
- [ ] Configurar proveedor Google en Supabase Dashboard
- [ ] Boton "Continuar con Google" en `/login` y `/registro`
- [ ] Manejar callback OAuth en `/auth/callback`

### 1.4 Proteccion de rutas
- [ ] Middleware que proteja rutas privadas (`/planes/crear`, `/perfil`)
- [ ] Redirigir usuarios no autenticados a `/login`
- [ ] Componente de contexto/provider para acceder al usuario actual

### 1.5 Logout
- [ ] Boton de cerrar sesion en el Navbar
- [ ] Limpiar sesion y redirigir a `/`

---

## Fase 2: Perfil de usuario

### 2.1 Modelo de datos
- [ ] Tabla `profiles` en Supabase (id, user_id, nombre, avatar_url, descripcion, created_at)
- [ ] Trigger para crear perfil automaticamente al registrarse
- [ ] Row Level Security (RLS): lectura publica, escritura solo propietario

### 2.2 Paginas
- [ ] Pagina `/perfil` — ver y editar perfil propio
- [ ] Pagina `/perfil/[id]` — ver perfil de otro usuario
- [ ] Formulario de edicion (nombre, descripcion, avatar)
- [ ] Upload de avatar a Supabase Storage

---

## Fase 3: Planes (CRUD)

### 3.1 Modelo de datos
- [ ] Tabla `plans` (id, creator_id, titulo, categoria, descripcion, fecha, ubicacion, aforo_max, created_at)
- [ ] Tabla `plan_participants` (plan_id, user_id, joined_at)
- [ ] RLS: lectura publica, creacion/edicion solo creador, inscripcion solo autenticados
- [ ] Categorias predefinidas: Aventura, Cultura, Deporte, Musica, Gastronomia, Ocio, Otros

### 3.2 Crear un plan
- [ ] Pagina `/planes/crear` con formulario
- [ ] Validacion de campos (titulo, categoria, fecha futura, aforo >= 2)
- [ ] Limite de 3 planes activos por usuario (cuenta gratuita)
- [ ] Redireccion al detalle del plan tras crearlo

### 3.3 Listar planes
- [ ] Pagina `/planes` con grid de tarjetas
- [ ] Filtro por categoria (badges/tabs)
- [ ] Ordenar por fecha (proximos primero)
- [ ] Paginacion o scroll infinito

### 3.4 Detalle de un plan
- [ ] Pagina `/planes/[id]` con toda la informacion del plan
- [ ] Lista de participantes con avatar y nombre
- [ ] Boton "Unirme" / "Salirme" segun estado
- [ ] Indicador de plazas disponibles

### 3.5 Inscripcion / desinscripcion
- [ ] Logica de unirse (verificar aforo, verificar usuario autenticado)
- [ ] Logica de salirse (eliminar de plan_participants)
- [ ] Feedback visual (toast/alert de confirmacion)

---

## Fase 4: Seguridad basica

- [ ] Verificacion de email obligatoria para crear planes
- [ ] Validacion de campos en cliente y servidor (sanitizacion de inputs)
- [ ] Rate limiting basico en acciones criticas (crear plan, inscribirse)
- [ ] Proteccion CSRF (incluida en Next.js por defecto)

---

## Orden de trabajo sugerido

| Orden | Tarea                          | Rama sugerida         |
|-------|--------------------------------|-----------------------|
| 1     | Setup Supabase + Auth email    | `autenticacion`       |
| 2     | Auth Google + middleware       | `autenticacion`       |
| 3     | Perfil de usuario              | `feature/perfil`      |
| 4     | CRUD de planes                 | `feature/planes`      |
| 5     | Inscripcion a planes           | `feature/planes`      |
| 6     | Filtros y listado              | `feature/planes`      |
| 7     | Seguridad y validaciones       | `feature/seguridad`   |

---

## Dependencias a instalar

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Variables de entorno necesarias

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```
