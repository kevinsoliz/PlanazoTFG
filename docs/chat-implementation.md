# Chat en Tiempo Real - Documentación de Implementación

## Resumen
El sistema de chat en tiempo real ha sido completamente refactorizado para ofrecer una mejor experiencia de usuario. El chat ahora se muestra en una página dedicada en lugar de un modal emergente, proporcionando más espacio y una interfaz mejorada.

## Arquitectura

### Frontend Stack
- **Next.js 16.2.4** - Framework React con SSR
- **Socket.IO Client** - Comunicación bidireccional en tiempo real
- **Tailwind CSS + DaisyUI** - Estilos y componentes
- **React Hooks** - Gestión de estado

### Backend Stack
- **Node.js 20 + Express.js** - Servidor web
- **Socket.IO** - WebSocket server
- **PostgreSQL** - Persistencia de mensajes
- **TypeScript** - Type safety

## Flujo de Navegación

### 1. Página "Mis Planes" (`/mis-planes`)
```
- Página SSR (Server-Side Rendered)
- Obtiene userName del usuario logueado
- Muestra dos columnas: planes creados y planes a los que se apuntó
- Cada plan tiene un botón de chat (ícono de mensaje)
- Botón abre chat en nueva página dedicada
```

### 2. Página de Chat (`/plan-chat/[id]`)
```
- Página Client (interactiva con hooks)
- Parámetro dinámico [id] = planId
- Obtiene info del usuario y plan
- Renderiza componente ChatPlan en full-height
- Botón "Volver" para regresar a mis-planes
```

### 3. Componente ChatPlan
```
- Componente reutilizable del chat
- Usa hook useChat para Socket.IO
- Renderiza:
  - Header con estado de conexión
  - Área de mensajes con auto-scroll
  - Formulario para enviar mensajes
```

## Estructura de Archivos

```
frontend/
├── app/
│   ├── (app)/
│   │   ├── mis-planes/
│   │   │   └── page.tsx              [SSR] Lista de planes con botón chat
│   │   └── plan-chat/
│   │       ├── layout.tsx             [Layout] Envuelve página de chat
│   │       └── [id]/
│   │           └── page.tsx           [Client] Página dedicada de chat
│   ├── components/
│   │   └── features/
│   │       ├── planes/
│   │       │   └── ChatModalBtn.tsx   [Client] Botón que navega a chat
│   │       └── chat/
│   │           └── ChatPlan.tsx       [Client] Componente UI del chat
│   └── hooks/
│       └── useChat.ts                 [Hook] Lógica Socket.IO

backend/
├── src/
│   ├── index.ts                       [Server] Express + Socket.IO config
│   ├── controllers/
│   │   └── chat.controller.ts         [Chat] Manejo de eventos Socket.IO
│   ├── lib/
│   │   └── chatDb.ts                  [DB] Queries de mensajes
│   ├── types/
│   └── middleware/
└── sql/
    └── init.sql                       [DB] Schema de mensajes
```

## Flujo de Datos

### Envío de Mensaje
```
1. Usuario escribe mensaje en ChatPlan
2. handleSubmit captura el evento
3. Envía sendMessage(contenido) del hook useChat
4. Socket.IO emite evento 'chat_message' al servidor
5. Backend recibe en chat.controller.ts
6. Guarda en BD (PostgreSQL)
7. Emite a todos en la room 'plan_${planId}'
8. Cliente recibe y actualiza state messages[]
```

### Conexión Socket.IO
```
Inicio:
1. useChat hook en ChatPlan
2. Crea conexión: io(backendUrl, { auth: { serverOffset, planId } })
3. Socket.IO conecta al servidor
4. Backend recibe conexión
5. Cliente emite 'join_plan' event
6. Backend agrega socket a room 'plan_${planId}'
7. Backend envía mensajes históricos
8. Estado: isConnected = true

Desconexión:
1. Si pierde conexión: intenta reconectar automáticamente
2. Exponential backoff: 1s → 2s → 4s (máx 5 intentos)
3. isConnected = false (UI lo indica con punto amarillo)
4. Input deshabilitado hasta reconectar
```

## Componentes Principales

### ChatModalBtn
**Ubicación**: `frontend/app/components/features/planes/ChatModalBtn.tsx`

**Props**:
```typescript
interface ChatModalBtnProps {
  planId: number;        // ID del plan
  userName: string;      // Nombre del usuario
  planTitulo: string;    // Título del plan
}
```

**Funcionalidad**:
- Botón circular con ícono de mensaje
- Click navega a `/plan-chat/${planId}`
- Usa `router.push()` de Next.js

### ChatPlan
**Ubicación**: `frontend/app/components/features/chat/ChatPlan.tsx`

**Props**:
```typescript
interface ChatPlanProps {
  planId: number;   // ID del plan
  userName: string; // Nombre del usuario actual
}
```

**Estado**:
- `messages` - Array de mensajes
- `isConnected` - Booleano de conexión Socket.IO
- `error` - String de error o null

**Características**:
- Header con indicador de conexión (pulsante verde = online)
- Auto-scroll al último mensaje
- Input deshabilitado si no está conectado
- Distinción de mensajes propios vs otros (colores diferentes)
- Empty state cuando no hay mensajes

### useChat Hook
**Ubicación**: `frontend/app/hooks/useChat.ts`

**Funcionalidad**:
- Maneja toda la lógica de Socket.IO
- Gestiona estado de conexión
- Recupera mensajes históricos
- Maneja reconexiones automáticas

**Retorna**:
```typescript
{
  messages: { content: string; user_name: string }[];
  sendMessage: (message: string) => void;
  isConnected: boolean;
  error: string | null;
}
```

## Backend - Socket.IO

### Eventos Escuchados
```typescript
// join_plan - Usuario se une a room del plan
socket.on('join_plan', (planId: number) => {
  socket.join(`plan_${planId}`);
  // Recupera mensajes históricos
});

// chat_message - Usuario envía mensaje
socket.on('chat_message', (msg: string, user: string, planId: number) => {
  // Guarda en BD
  // Emite a room
  io.to(`plan_${planId}`).emit('chat_message', {
    content: msg,
    user_name: user
  });
});
```

### Eventos Emitidos
```typescript
// chat_message - Nuevo mensaje
socket.emit('chat_message', { content, user_name });

// previous_messages - Mensajes históricos
socket.emit('previous_messages', messages);
```

## Configuración de Entorno

### Frontend (`.env.local`)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (`.env`)
```
PORT=4000
DATABASE_URL=postgresql://user:pass@db:5432/planazo_db
FRONTEND_URL=http://localhost:3000
```

### Docker Compose
```yaml
services:
  db:
    - Port: 5432
    - Database: planazo_db
  
  backend:
    - Port: 4000
    - Dependencia: db
  
  frontend:
    - Port: 3000
    - Dependencia: backend
```

## Testing

### Verificar Conexión
1. Ir a `/mis-planes`
2. Click en botón chat de un plan
3. Verificar indicador de conexión (punto verde)
4. Escribir mensaje
5. Verificar que aparece en el chat

### Testing Multi-usuario
1. Abrir 2 pestañas/navegadores con diferentes usuarios
2. Navegar a `/mis-planes` en ambos
3. Abrir chat del mismo plan
4. Enviar mensajes desde una pestaña
5. Verificar que aparecen en tiempo real en la otra

### Verificar Persistencia
1. Enviar varios mensajes
2. Cerrar chat
3. Reabrir chat
4. Verificar que los mensajes anteriores siguen ahí

## Troubleshooting

### Socket.IO no conecta
- Verificar que backend está corriendo (port 4000)
- Verificar CORS en backend (debe incluir frontend URL)
- Revisar console del navegador (F12 → Console)
- Revisar logs del backend

### Mensajes no se envían
- Verificar isConnected = true
- Revisar que planId es correcto
- Revisar logs del servidor (docker logs backend)

### Botón chat no navega
- Verificar que router está correctamente importado
- Revisar ruta `/plan-chat/[id]` existe
- Verificar planId es número válido

## Mejoras Futuras
- [ ] Typing indicators ("X está escribiendo...")
- [ ] Reacciones a mensajes
- [ ] Búsqueda en historial
- [ ] Exportar conversación
- [ ] Menciones de usuarios (@user)
- [ ] Archivos/imágenes en chat
- [ ] Notificaciones de nuevos mensajes

## Referencias
- [Socket.IO Docs](https://socket.io/)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [React Hooks](https://react.dev/reference/react/hooks)
