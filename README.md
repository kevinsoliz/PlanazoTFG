# Planazo

Aplicación web para crear y unirse a planes presenciales entre personas con intereses compartidos.

Planazo nace de un problema real: las redes sociales priorizan la interacción virtual sobre el encuentro real. Esta plataforma permite a cualquier usuario publicar una actividad (una ruta, un concierto, una partida de ajedrez) y que otras personas con el mismo interes puedan apuntarse.

## Stack tecnico

| Capa | Tecnologia |
|------|------------|
| Frontend | Next.js + React + TypeScript + Tailwind CSS + DaisyUI |
| Backend | Express + TypeScript |
| Base de datos | PostgreSQL (SQL directo con pg) |
| Autenticacion | Sesiones de Express con almacenamiento en PostgreSQL |
| Contenedores | Docker + Docker Compose |
| Despliegue | Railway |

## Estructura del proyecto

```
PlanazoTFG/
├── frontend/          # Next.js app
├── backend/           # Express API
├── docker-compose.yml # Orquestacion de servicios (dev)
└── docs/              # Documentacion del proyecto
```

## Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose
- [Node.js](https://nodejs.org/) v20+

## Instalación y desarrollo

1. Clonar el repositorio:

```bash
git clone https://github.com/kevinsoliz/PlanazoTFG.git
cd PlanazoTFG
```

2. Crear el fichero `.env` en `backend/` con las variables necesarias:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@db:5432/planazo
SESSION_SECRET=tu_secreto_aqui
FRONTEND_URL=http://localhost:3000
```

3. Crear el fichero `.env.local` en `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. Levantar los servicios con Docker Compose:

```bash
docker compose up --build
```

5. Acceder a la aplicacion:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api

## Funcionalidades principales

- **Autenticacion**: Registro e inicio de sesión con email y contraseña
- **Perfil de usuario**: Nombre, avatar, descripcion y categorias de interes
- **Planes**: Crear, listar, filtrar por categoria, ver detalle, apuntarse y desapuntarse
- **Limite de planes**: Máximo 3 planes activos por usuario
- **Seguridad**: Queries parametrizadas, passwords hasheados con bcrypt

## Scripts utiles

```bash
# Levantar entorno de desarrollo
docker compose up --build

# Acceder a la base de datos
docker exec -it planazo-db psql -U postgres -d planazo

# Ver logs del backend
docker logs -f planazo-backend
```

## Despliegue

La aplicación esta desplegada en [Railway](https://getplanazo.es/) con servicios separados para frontend, backend y base de datos.

## Licencia

Proyecto academico — Trabajo de Fin de Grado.
