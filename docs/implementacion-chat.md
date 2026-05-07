# Implementación Chat en Tiempo Real

## 📌 Resumen
Chat con Socket.IO para comunicación bidireccional, PostgreSQL para persistencia, DaisyUI para UI moderna, avatares de usuario, timestamps y colores únicos por usuario.

---

## 🏗️ Arquitectura

### Frontend
- **Next.js 16** con componentes client-side
- **Socket.IO Client** para WebSocket
- **React Hooks** (useState, useRef, useEffect)
- **Tailwind + DaisyUI** para estilos y componentes de chat
- **Avatares de usuario** desde perfiles
- **Colores únicos** por usuario usando HSL
- **Timestamps** formateados en español

### Backend
- **Node.js + Express**
- **Socket.IO** server (puerto 4000)
- **PostgreSQL** para guardar mensajes con user_id y created_at
- **TypeScript** para type safety
- **Integración con perfiles** para avatares

---

## 🎯 Flujo de Usuario

### 1. Página "Mis Planes" (`/mis-planes`)
```
┌─────────────────────────┐
│   Mis Planes (SSR)      │
│                         │
│  Plan 1  [chat btn]     │
│  Plan 2  [chat btn] ◄─── Botón abre modal
│  Plan 3  [chat btn]     │
└─────────────────────────┘
```

### 2. Modal Chat
```
┌──────────────────────────────┐
│  Título del plan         [X] │  ← Header dedicado
├──────────────────────────────┤
│  [Avatar] User1: Hola        │  ← Avatar + nombre + color único
│                    [Avatar] Yo│
│                    Hola       │  ← Mensajes propios derecha
│  [Avatar] User1: ¿Qué tal?   │
│                    14:30     │  ← Timestamp en footer
├──────────────────────────────┤
│  [Input mensaje] [btn enviar]│
└──────────────────────────────┘
```

### 3. Conexión Socket.IO
```
Frontend                    Backend
   |                          |
   |--- connect(auth: userId)->|
   |                    io.on('connection')
   |                          |
   |--- emit('join_plan') --->|
   |                   socket.join('plan_123')
   |                          |
   |<-- previous_messages ----|
   |                   (historial con avatar, timestamp, userId)
   |                          |
   |--- emit('chat_message')->|
   |                   guardar en BD con user_id
   |                   consultar perfil para avatar
   |<-- chat_message ---------|
   |                   (broadcast con avatar, timestamp, userId)
   |
```

---

## 📁 Estructura de Archivos

```
frontend/
├── app/
│   ├── (app)/
│   │   ├── home/[id]/
│   │   │   └── page.tsx                    ✅ Página de plan con chat integrado
│   │   └── mis-planes/
│   │       └── page.tsx                    ✅ Página con botón chat
│   ├── components/
│   │   └── features/
│   │       ├── planes/
│   │       │   └── ChatModalBtn.tsx        ✅ Botón que abre modal (recibe userId)
│   │       └── chat/
│   │           └── ChatPlan.tsx            ✅ Componente del chat con DaisyUI
│   ├── hooks/
│   │   └── useChat.ts                      ✅ Lógica Socket.IO con auth userId
│   └── services/
│       └── perfiles.ts                     ✅ Servicio para obtener perfiles
│
backend/
├── src/
│   ├── index.ts                            ✅ Express + Socket.IO setup
│   ├── controllers/
│   │   └── chat.controller.ts              ✅ Event handlers con avatares
│   ├── lib/
│   │   └── chatDb.ts                       ✅ Queries a DB con created_at
│   ├── services/
│   │   └── perfiles.service.ts             ✅ Servicio para consultar perfiles
│   ├── db.ts                               ✅ Pool de PostgreSQL
│   └── types/
│       └── session.ts                      ✅ Tipado de session
│
└── sql/
    └── init.sql                            ✅ CREATE TABLE messages con user_id, created_at
```

---

## 🔌 Componentes Principales

### `ChatModalBtn.tsx` - Botón que abre el modal
```tsx
export default function ChatModalBtn({ planId, userName, userId, planTitulo }) {
  // ... modal logic
  <ChatPlan planId={planId} userName={userName} userId={userId} />
}
```

### `ChatPlan.tsx` - Componente principal del chat (DaisyUI)
```tsx
export default function ChatPlan({ planId, userName, userId }) {
  const { messages, sendMessage } = useChat(planId, userName, userId);
  const messagesEndRef = useRef(null);

  const formatCreatedAt = (createdAt: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(createdAt));
  };

  const getUserColor = (userId: number) => {
    const hue = (userId * 137.5) % 360;
    return `hsl(${hue}, 65%, 88%)`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      form.reset();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral/5">
        {messages.map((m, i) => (
          <div key={i} className={`chat ${m.user_name === userName ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={m.avatar || '/images/avatars/avatar-1.png'} alt={m.user_name} />
              </div>
            </div>
            <div className="chat-header">{m.user_name}</div>
            <div className="chat-bubble" style={{ backgroundColor: getUserColor(m.user_id) }}>
              {m.content}
            </div>
            <div className="chat-footer opacity-50 text-[11px]">
              {m.created_at ? formatCreatedAt(m.created_at) : ''}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-neutral/20 flex gap-2">
        <input
          name="message"
          className="input input-bordered flex-1 rounded-full px-4"
          placeholder="Escribe un mensaje..."
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary btn-circle bg-neutral">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.519 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
```

**Props:**
- `planId` (number) - ID del plan
- `userName` (string) - Nombre del usuario actual
- `userId` (number) - ID del usuario actual

**Características:**
- Usa componentes DaisyUI (`chat`, `chat-start/end`, `chat-image`, etc.)
- Avatares de usuario desde perfiles
- Colores únicos por usuario usando HSL
- Timestamps formateados en español
- Auto-scroll al último mensaje

---

### `useChat.ts` - Hook que maneja Socket.IO
```tsx
export function useChat(planId: number, userName: string, userId: number) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Conectar con autenticación
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    socketRef.current = io(backendUrl, {
      auth: {
        serverOffset: 0,    // Para historial offline
        planId,             // Identificar la sala
        userId              // Para autenticación backend
      }
    });

    // 2. Unirse a la sala del plan
    socketRef.current.emit('join_plan', planId);

    // 3. Escuchar mensajes
    socketRef.current.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
      // Actualizar offset para reconexiones
      socketRef.current.auth.serverOffset = msg.id;
    });

    // 4. Limpiar al desmontar
    return () => socketRef.current?.disconnect();
  }, [planId, userId]);

  const sendMessage = (content: string) => {
    if (socketRef.current && content.trim()) {
      socketRef.current.emit('chat_message', {
        message: content,
        user: userName,
        planId
      });
    }
  };

  return { messages, sendMessage };
}
```

**Parámetros:**
- `planId` (number) - ID del plan para esta sala de chat
- `userName` (string) - Nombre de usuario actual
- `userId` (number) - ID del usuario actual para autenticación

**Retorna:**
- `messages[]` - Array de mensajes con `{ content, user_name, avatar, created_at, user_id }`
- `sendMessage(str)` - Función para enviar mensaje

**Lógica:**
1. **Conectar**: Abre WebSocket a backend con `userId` en auth
2. **Auth**: Envía `planId` y `userId` en autenticación
3. **Join**: Emite `join_plan` para unirse a la sala
4. **Listen**: Escucha `chat_message` con datos completos (avatar, timestamp, etc.)
5. **Send**: Emite `chat_message` con objeto estructurado

---

## 🖥️ Backend - Socket.IO Handlers

### `index.ts` - Setup principal
```ts
import http from 'http';
import { Server } from 'socket.io';

// Envolver Express en servidor HTTP
const server = http.createServer(app);

// Socket.IO con configuración
const io = new Server(server, {
  connectionStateRecovery: {},  // Auto-reconectar
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

// Registrar handlers
io.on('connection', (socket) => {
  registerChatHandlers(io, socket);
});

// Escuchar en puerto
server.listen(PORT, () => {
  console.log(`✓ Server en http://localhost:${PORT}`);
  console.log(`✓ Socket.IO en http://localhost:${PORT}`);
});
```

**Puntos clave:**
- ✅ `http.createServer(app)` - Socket.IO necesita servidor HTTP
- ✅ `connectionStateRecovery: {}` - Reconectar automáticamente
- ✅ `server.listen()` en lugar de `app.listen()`

---

### `chat.controller.ts` - Event handlers
```ts
export async function registerChatHandlers(io, socket) {
  const chatDb = await getChatDB();

  // 1. Usuario se une a la sala
  socket.on('join_plan', async (planId) => {
    socket.join(`plan_${planId}`);

    // Enviar historial de mensajes
    try {
      const messages = await chatDb.getMessagesByPlan(planId);
      const messagesWithAvatars = await Promise.all(
        messages.map(async (msg) => {
          const perfil = await getPerfilByUserId(msg.user_id);
          return {
            ...msg,
            avatar: perfil?.avatar_url
          };
        })
      );

      socket.emit('previous_messages', messagesWithAvatars);
    } catch (error) {
      console.error('Error loading message history:', error);
    }
  });

  // 2. Nuevo mensaje
  socket.on('chat_message', async (data) => {
    try {
      const { message, user, planId } = data;
      const userId = socket.handshake.auth.userId;

      if (!userId) {
        socket.emit('error', 'Usuario no autenticado');
        return;
      }

      // Obtener perfil del usuario para avatar
      const perfil = await getPerfilByUserId(userId);

      // Insertar mensaje en BD
      const result = await chatDb.insertMessage({
        content: message,
        user_id: userId,
        plan_id: planId
      });

      // Broadcast a todos en la sala
      io.to(`plan_${planId}`).emit('chat_message', {
        id: result.id,
        content: message,
        user_name: user,
        user_id: userId,
        avatar: perfil?.avatar_url,
        created_at: result.created_at
      });
    } catch (e) {
      console.error('Error sending message:', e);
      socket.emit('error', 'Error al enviar mensaje');
    }
  });
}
```

**Eventos escuchados:**
1. `join_plan(planId)` - Usuario se une a sala `plan_{planId}` y recibe historial
2. `chat_message(data)` - Nuevo mensaje con `{ message, user, planId }`

**Eventos emitidos:**
1. `previous_messages(messages[])` - Historial al unirse a sala
2. `chat_message(msg)` - Broadcast con datos completos (id, content, user_name, user_id, avatar, created_at)
3. `error(message)` - Errores de validación

---

### `chatDb.ts` - Acceso a BD
```ts
export async function getChatDB() {
  // Crear tabla si no existe con nueva estructura
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users(id),
      plan_id INTEGER NOT NULL REFERENCES planes(id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Asegurar columna created_at en tablas existentes
  await pool.query(`
    ALTER TABLE messages
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()
  `);

  // Cambiar user_name por user_id si es necesario
  try {
    await pool.query(`
      ALTER TABLE messages
      DROP COLUMN IF EXISTS user_name,
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)
    `);
  } catch (error) {
    // Ignorar si ya se cambió
  }

  return {
    // INSERT - devuelve ID y timestamp generado
    insertMessage: async ({ content, user_id, plan_id }) => {
      const result = await pool.query(
        'INSERT INTO messages (content, user_id, plan_id) VALUES ($1, $2, $3) RETURNING id, created_at',
        [content, user_id, plan_id]
      );
      return result.rows[0];
    },

    // SELECT - mensajes por plan con orden cronológico
    getMessagesByPlan: async (planId) => {
      const result = await pool.query(
        'SELECT id, content, user_id, created_at FROM messages WHERE plan_id = $1 ORDER BY created_at ASC',
        [planId]
      );
      return result.rows;
    }
  };
}
```

**Importante:**
- ✅ Nueva estructura con `user_id` y `created_at`
- ✅ `REFERENCES` para integridad referencial
- ✅ `ALTER TABLE` para migración compatible
- ✅ Métodos específicos para insertar y consultar mensajes

---

## 🔄 Flujo de Datos

### Envío de Mensaje
```
1. Usuario escribe "Hola" y da click al botón
   ↓
2. handleSubmit() captura el evento
   ↓
3. sendMessage("Hola") del hook
   ↓
4. socket.emit('chat_message', { message: "Hola", user: "Juan", planId: 123 })
   ↓
5. Backend recibe en chat.controller.ts
   ↓
6. Valida userId de socket.handshake.auth.userId
   ↓
7. Consulta perfil: SELECT avatar_url FROM perfiles WHERE user_id = ?
   ↓
8. INSERT INTO messages (content, user_id, plan_id) VALUES ('Hola', userId, 123)
   ↓
9. io.to('plan_123').emit('chat_message', {
     id: ID,
     content: 'Hola',
     user_name: 'Juan',
     user_id: userId,
     avatar: 'url-avatar',
     created_at: '2024-01-01T10:30:00Z'
   })
   ↓
10. Frontend recibe → setMessages([...prev, mensajeCompleto])
    ↓
11. Render: aparece mensaje con avatar, color único, timestamp
    ↓
12. scrollIntoView({ behavior: 'smooth' }) → scroll automático
```

### Conexión Socket.IO
```
1. Cliente abre ChatPlan con userId
   ↓
2. useChat hook ejecuta useEffect
   ↓
3. io(backendUrl, { auth: { serverOffset: 0, planId: 123, userId: 456 } })
   ↓
4. Backend: io.on('connection', socket => registerChatHandlers)
   ↓
5. socket.on('join_plan', planId) → socket.join('plan_123')
   ↓
6. Consultar historial: SELECT * FROM messages WHERE plan_id = 123 ORDER BY created_at
   ↓
7. Para cada mensaje: consultar perfil para obtener avatar
   ↓
8. socket.emit('previous_messages', [msg1, msg2, ...]) → enviar historial completo
   ↓
9. Frontend recibe mensajes históricos con avatares y timestamps
   ↓
10. setMessages([...históricos]) → mostrar conversación completa
```

---

## ⚙️ Configuración

### Docker Compose - Variables de Entorno
```yaml
backend:
  environment:
    PORT: 4000
    DATABASE_URL: postgresql://planazo:planazo_dev_123@db:5432/planazo
    SESSION_SECRET: tu_secreto
    FRONTEND_URL: http://localhost:3000

frontend:
  environment:
    NEXT_PUBLIC_BACKEND_URL: http://localhost:4000  # Para Socket.IO
    NEXT_PUBLIC_API_URL: http://localhost:3000/api  # Para fetch
    BACKEND_URL: http://backend:4000                # Para SSR
```

### Base de Datos
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  plan_id INTEGER NOT NULL REFERENCES planes(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para rendimiento
CREATE INDEX idx_messages_plan_id ON messages(plan_id);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

---

## 🚀 Cómo Funciona en Producción

1. **Levantarlo**
   ```bash
   docker-compose up
   ```

2. **Ir a la app**
   ```
   http://localhost:3000/mis-planes
   ```

4. **Clickear botón chat**
   - Se abre modal con `userId` del usuario actual
   - `useChat` hook establece WebSocket con autenticación
   - Socket.IO emite `join_plan` con ID del plan
   - Backend valida `userId` y carga mensajes históricos con avatares

5. **Escribir mensaje**
   - Input captura texto
   - Form submit → `sendMessage()`
   - Socket.IO emite mensaje estructurado a servidor
   - Servidor valida usuario, consulta avatar, guarda en BD
   - Servidor broadcast a todos en sala con datos completos
   - Chat recibe y renderiza con DaisyUI, colores únicos, timestamps

---

## 🎨 Nuevas Funcionalidades (v2.0)

### Avatares de Usuario
- **Integración**: Consultas a tabla `perfiles` para obtener `avatar_url`
- **Backend**: `getPerfilByUserId(userId)` en cada mensaje
- **Frontend**: `<img src={avatar || fallback} />` en `chat-image`
- **Fallback**: `/images/avatars/avatar-1.png` si no hay avatar personalizado

### Timestamps
- **Base de datos**: Columna `created_at TIMESTAMP DEFAULT NOW()`
- **Formato**: `Intl.DateTimeFormat('es-ES', { dateStyle: 'short', timeStyle: 'short' })`
- **Ubicación**: `chat-footer` con `opacity-50` y `text-[11px]`
- **Ejemplo**: "01/01/24 14:30"

### Colores Únicos por Usuario
- **Algoritmo**: `hue = (userId * 137.5) % 360`
- **HSL**: `hsl(${hue}, 65%, 88%)` - saturación media, claridad alta
- **Aplicación**: `style={{ backgroundColor: getUserColor(user_id) }}`
- **Resultado**: Colores consistentes y únicos por usuario

### Cambios en Base de Datos
```sql
-- Nueva estructura de tabla messages
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),  -- Cambió de user_name
  plan_id INTEGER NOT NULL REFERENCES planes(id), -- Nueva referencia
  created_at TIMESTAMP DEFAULT NOW()              -- Nuevo campo
);

-- Migración compatible
ALTER TABLE messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE messages DROP COLUMN IF EXISTS user_name;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
```

### Autenticación Mejorada
- **Socket Auth**: `auth: { userId, planId, serverOffset }`
- **Validación**: Backend verifica `userId` antes de procesar mensajes
- **Props Chain**: `userId` se pasa desde páginas → componentes → hooks
- **Error Handling**: Emite `'error'` si usuario no autenticado

### Componentes DaisyUI Utilizados
- `chat`: Contenedor principal del mensaje
- `chat-start` / `chat-end`: Alineación izquierda/derecha
- `chat-image`: Avatar circular del usuario
- `chat-header`: Nombre del usuario remitente
- `chat-bubble`: Contenido del mensaje con color único
- `chat-footer`: Timestamp con opacidad reducida

---

## 🔧 Consideraciones Técnicas

### Rendimiento
- Consultas adicionales a `perfiles` por mensaje histórico
- Generación de colores en cliente (bajo costo)
- Auto-scroll optimizado con `useRef`

### Compatibilidad
- Requiere DaisyUI 5.5.19+
- Compatible con PostgreSQL
- Funciona con Socket.IO v4+

### Seguridad
- `userId` validado en cada mensaje
- Autenticación requerida para chat
- Sanitización de inputs

---

## 🎨 Arquitectura de Contenedores

### Estructura Jerárquica

**Modal (en `/mis-planes`):**
```
<ChatModalBtn>                              {estado: isOpen}
  ├─ <button>                              {abre modal}
  └─ {isOpen && (
       <div className="modal modal-open">  {fondo oscuro}
         <div className="modal-box flex-col">
           ├─ <div className="header">     {Header: título + botón X}
           └─ <div className="flex-1">     {Container flex para expander}
                 <ChatPlan>                {Componente renderizado aquí}
                   └─ <>
                       ├─ <div messages>  {Área scrolleable}
                       └─ <form>          {Input + botón enviar}
               </div>
         </div>
       </div>
     )}
</ChatModalBtn>
```

**Página de Detalle (en `[id]/page.tsx`):**
```
<section className="rounded-md border-2">
  ├─ <header>                         {Header: "Chat del plan"}
  └─ <div className="h-96 flex-col">  {Container con altura fija}
       <ChatPlan>                     {Componente renderizado aquí}
         └─ <>
             ├─ <div messages>        {Área scrolleable}
             └─ <form>                {Input + botón enviar}
       </div>
</section>
```

### Puntos Clave de Diseño

1. **ChatPlan es un fragmento (`<>`)**
   - No tiene contenedor propio
   - Retorna solo los elementos internos (div de mensajes + form)
   - Se expande para llenar el contenedor padre

2. **Contenedor padre proporciona estructura**
   - **Modal**: `<div className="flex-1 flex flex-col bg-base-100">`
   - **Página**: `<div className="h-96 flex flex-col">`
   - Ambos usan `flex flex-col` para distribuir espacio

3. **Header separado del componente**
   - Modal: Header en `ChatModalBtn.tsx` (título del plan + botón cerrar)
   - Página: Header en `page.tsx` (título "Chat del plan")
   - ChatPlan no incluye header (reutilizable en ambos contextos)

4. **Auto-scroll funciona porque**
   - Mensajes están en `div className="flex-1 overflow-y-auto"`
   - `flex-1` hace que crezca y llene el espacio disponible
   - `scrollIntoView()` hace scroll suave al último mensaje

---

## 🐛 Problemas Comunes

### "No conecta a Socket.IO"
```
✅ Verificar: backend está en puerto 4000
✅ Verificar: NEXT_PUBLIC_BACKEND_URL = http://localhost:4000
✅ Revisar Console del navegador (F12 → Console)
✅ Revisar logs del backend (docker logs backend)
```

### "Mensajes no se guardan"
```
✅ Verificar: DATABASE_URL correcta
✅ Verificar: Tabla messages existe (SELECT * FROM messages;)
✅ Revisar: Chat.controller.ts usa $1, $2, $3 (no ?)
✅ Revisar: Logs de error en backend
```

### "Modal no abre"
```
✅ Verificar: ChatModalBtn.tsx tiene useState
✅ Verificar: onClick={() => setIsOpen(true)} está
✅ Verificar: Componente está marcado como "use client"
```

### "Auto-scroll no funciona"
```
✅ Verificar: useRef y useEffect importados en ChatPlan
✅ Verificar: <div ref={messagesEndRef} /> al final de mensajes
✅ Verificar: useEffect tiene [messages] en dependencies
```

---

## ✅ Checklist para Probar

- [ ] Backend corre sin errores (docker logs backend)
- [ ] Frontend corre sin errores (docker logs frontend)
- [ ] Puedo ir a http://localhost:3000/mis-planes
- [ ] Botón chat aparece en cada plan
- [ ] Click abre modal
- [ ] Socket.IO conecta (buscar "Socket.IO" en console)
- [ ] Escribo un mensaje y aparece en el chat
- [ ] Mensaje aparece en tiempo real (sin refresh)
- [ ] Cierro y reabro modal, los mensajes siguen ahí
- [ ] Puedo escribir desde 2 pestañas y ver mensajes en tiempo real

---

## 📚 Referencias

- [Socket.IO Docs](https://socket.io)
- [Express + Socket.IO](https://socket.io/docs/v4/server-initialization/)
- [PostgreSQL Node.js](https://node-postgres.com)
- [Next.js Client Components](https://nextjs.org/docs/getting-started/react-essentials)
- [React Hooks](https://react.dev/reference/react/hooks)
