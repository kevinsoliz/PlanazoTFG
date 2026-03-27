# Planazo — Project Scope

## 1. Problema

Las redes sociales actuales priorizan la interacción virtual sobre el encuentro real. Existe una creciente sensación de aislamiento social, especialmente entre jóvenes (18–30 años), causada por:

- Incompatibilidad de agendas con amigos cercanos
- Falta de personas del entorno con intereses específicos compartidos
- Dificultad para ampliar el círculo social fuera de contextos de citas o redes generalistas
- Ausencia de una plataforma enfocada exclusivamente en planes presenciales reales

Las alternativas existentes (Facebook Events, Meetup, Bumble BFF) no resuelven el problema de forma directa: están orientadas a comunidades recurrentes, citas, o son funcionalidades secundarias dentro de productos más grandes.

---

## 2. Solución

Planazo es una aplicación web que permite a cualquier usuario **crear y unirse a planes presenciales** basados en intereses compartidos, sin el foco en ligar ni en construir comunidades permanentes.

El usuario puede publicar una actividad (un concierto, una ruta, una partida de ajedrez) y otras personas cercanas con el mismo interés pueden apuntarse. La conexión se produce a través del plan, no a través del perfil.

Stack técnico:
- **Frontend**: Next.js + TypeScript + Tailwind CSS + DaisyUI
- **Backend**: Express + TypeScript
- **Base de datos**: PostgreSQL (SQL directo con pg)
- **Autenticación**: Sesiones de Express con almacenamiento en PostgreSQL
- **Contenedores**: Docker + Docker Compose
- **Despliegue**: Railway
- **Estructura**: Monorepo (frontend/ + backend/)

---

## 3. Features — MVP

Funcionalidades mínimas para validar la propuesta de valor:

### Autenticación
- Registro e inicio de sesión con email/contraseña
- Sesiones gestionadas con Express y almacenadas en PostgreSQL

### Perfil de usuario
- Nombre, foto y descripción breve
- Visualización del perfil propio y de otros usuarios

### Planes
- Crear un plan (título, categoría, descripción, fecha, ubicación, aforo máximo)
- Listar planes disponibles con filtro por categoría
- Ver el detalle de un plan
- Apuntarse / desapuntarse de un plan
- Límite de 3 planes activos por usuario (cuenta gratuita)

### Seguridad básica
- Perfiles verificados (email confirmado)
- Restricción de contenido inapropiado mediante validación de campos
- Protección contra inyección SQL (queries parametrizadas)

---

## 4. Features — Fuera del MVP

Funcionalidades identificadas para iteraciones posteriores:

### Monetización
- Plan Premium: planes ilimitados, badge "Usuario Pro", posicionamiento prioritario en el feed
- Acceso a estadísticas del perfil (número de visitas)

### Descubrimiento avanzado
- Algoritmo de recomendación basado en historial de intereses y preferencias
- Geolocalización en tiempo real para sugerencias hiperlocales
- Búsqueda con filtros combinados (fecha, distancia, categoría, aforo)

### Comunicación
- Chat integrado por plan entre los participantes
- Sistema de confirmación de asistencia (RSVP) con notificaciones

### Confianza y comunidad
- Sistema de valoraciones entre participantes tras un plan
- Moderación de contenido y reporte de usuarios
- Historial de planes pasados en el perfil

### B2B / Alianzas
- Panel para organizadores de eventos y negocios locales
- Planes patrocinados o destacados por marcas y comercios
