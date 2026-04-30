# Implementación Chat en Tiempo Real 

## 📌 Resumen
Chat simplificado que se abre desde `/mis-planes`. Usa Socket.IO para comunicación bidireccional y PostgreSQL para persistencia de mensajes.

---

## 🏗️ Arquitectura

### Frontend
- **Next.js 16** con componentes client-side
- **Socket.IO Client** para WebSocket
- **React Hooks** (useState, useRef, useEffect)
- **Tailwind + DaisyUI** para estilos

### Backend  
- **Node.js + Express**
- **Socket.IO** server (puerto 4000)
- **PostgreSQL** para guardar mensajes
- **TypeScript** para type safety

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
┌─────────────────────────┐
│   Modal                 │
│  ┌────────────────────┐ │
│  │ Chat en vivo   [X] │ │
│  ├────────────────────┤ │
│  │ User1: Hola       │ │
│  │              Yo: Hola (derecha)
│  │ User1: ¿Qué tal?  │ │
│  ├────────────────────┤ │
│  │ [Input] [Send btn] │ │
│  └────────────────────┘ │
└─────────────────────────┘
```

### 3. Conexión Socket.IO
```
Frontend                    Backend
   |                          |
   |--- connect() ----------->|
   |                    io.on('connection')
   |                          |
   |--- emit('join_plan') --->|
   |                   socket.join('plan_123')
   |                          |
   |<-- previous_messages ----|
   |                   (historial)
   |                          |
   |--- emit('chat_message')->|
   |                   guardar en BD
   |<-- chat_message ---------|
   |                   (broadcast a room)
   |
```

---

## 📁 Estructura de Archivos

```
frontend/
├── app/
│   ├── (app)/
│   │   └── mis-planes/
│   │       └── page.tsx                    ✅ Página con botón chat
│   ├── components/
│   │   └── features/
│   │       ├── planes/
│   │       │   └── ChatModalBtn.tsx        ✅ Botón que abre modal
│   │       └── chat/
│   │           └── ChatPlan.tsx            ✅ Componente del chat
│   └── hooks/
│       └── useChat.ts                      ✅ Lógica Socket.IO
│
backend/
├── src/
│   ├── index.ts                            ✅ Express + Socket.IO setup
│   ├── controllers/
│   │   └── chat.controller.ts              ✅ Event handlers
│   ├── lib/
│   │   └── chatDb.ts                       ✅ Queries a DB
│   ├── db.ts                               ✅ Pool de PostgreSQL
│   └── types/
│       └── session.ts                      ✅ Tipado de session
│
└── sql/
    └── init.sql                            ✅ CREATE TABLE messages
```

---

## 🔌 Componentes Principales

### `ChatModalBtn.tsx` - Botón que abre el modal
```tsx
"use client";
export default function ChatModalBtn({ planId, userName, planTitulo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn btn-circle">
        💬
      </button>
      
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button onClick={() => setIsOpen(false)}>✕</button>
            <ChatPlan planId={planId} userName={userName} />
          </div>
        </div>
      )}
    </>
  );
}
```

**Props:**
- `planId` (number) - ID del plan
- `userName` (string) - Nombre del usuario actual
- `planTitulo` (string) - Título del plan (opcional)

**Funcionalidad:**
- Click abre modal
- Click en X o backdrop cierra modal
- Renderiza `<ChatPlan>` dentro

---

### `ChatPlan.tsx` - Componente principal del chat
```tsx
"use client";
export default function ChatPlan({ planId, userName }) {
  const { messages, sendMessage } = useChat(planId, userName);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-primary p-4 text-primary-content">
        Chat en vivo
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id}>
            <span className="text-xs">{m.user_name}</span>
            <div className={m.user_name === userName ? 'bg-blue-500' : 'bg-gray-200'}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll to here */}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input name="message" placeholder="Escribe un mensaje..." />
        <button type="submit" className="btn btn-primary btn-circle">
          ➤
        </button>
      </form>
    </div>
  );
}
```

**Props:**
- `planId` (number) - ID del plan para esta sala de chat
- `userName` (string) - Nombre de usuario actual

**Características:**
- ✅ Auto-scroll al último mensaje
- ✅ Diferencia mensajes propios vs ajenos (colores)
- ✅ Formulario simple sin validaciones extra
- ✅ Input se limpia después de enviar

---

### `useChat.ts` - Hook que maneja Socket.IO
```tsx
export function useChat(planId: number, userName: string) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Conectar
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    socketRef.current = io(backendUrl, {
      auth: { 
        serverOffset: 0,    // Para historial offline
        planId              // Identificar la sala
      }
    });

    // 2. Unirse a la sala del plan
    socketRef.current.emit('join_plan', planId);

    // 3. Escuchar mensajes
    socketRef.current.on('chat_message', (msg, id, user) => {
      setMessages((prev) => [...prev, { 
        content: msg, 
        user_name: user 
      }]);
      // Actualizar offset para reconexiones
      socketRef.current.auth.serverOffset = id;
    });

    // 4. Limpiar al desmontar
    return () => socketRef.current?.disconnect();
  }, [planId]);

  const sendMessage = (content: string) => {
    if (socketRef.current && content.trim()) {
      socketRef.current.emit('chat_message', content, userName, planId);
    }
  };

  return { messages, sendMessage };
}
```

**Retorna:**
- `messages[]` - Array de mensajes `{ content, user_name }`
- `sendMessage(str)` - Función para enviar mensaje

**Lógica:**
1. **Conectar**: Abre WebSocket a backend
2. **Auth**: Envía planId en autenticación
3. **Join**: Emite `join_plan` para unirse a la sala
4. **Listen**: Escucha `chat_message` del servidor
5. **Send**: Emite `chat_message` con (contenido, usuario, planId)

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
  socket.on('join_plan', (planId) => {
    socket.join(`plan_${planId}`);
    // Opcionalmente: enviar historial
  });

  // 2. Nuevo mensaje
  socket.on('chat_message', async (msg, user, planId) => {
    try {
      // Guardar en BD
      const result = await chatDb.run(
        'INSERT INTO messages (content, user_name, plan_id) VALUES ($1, $2, $3)',
        [msg, user, planId]
      );
      
      // Broadcast a todos en la sala
      io.to(`plan_${planId}`).emit('chat_message', 
        msg, 
        result.lastID, 
        user
      );
    } catch (e) {
      console.error('Error:', e);
    }
  });

  // 3. Historial offline (si se reconecta)
  if (!socket.recovered) {
    const lastId = socket.handshake.auth.serverOffset || 0;
    const planId = socket.handshake.auth.planId;
    
    const results = await chatDb.all(
      'SELECT id, content, user_name FROM messages WHERE id > $1 AND plan_id = $2',
      [lastId, planId]
    );
    
    results.forEach(row => {
      socket.emit('chat_message', row.content, row.id, row.user_name);
    });
  }
}
```

**Eventos escuchados:**
1. `join_plan(planId)` - Usuario se une a sala `plan_{planId}`
2. `chat_message(msg, user, planId)` - Nuevo mensaje
3. `connection` + `recover` - Historial para reconexiones

**Eventos emitidos:**
1. `chat_message(msg, id, user)` - Broadcast a sala

---

### `chatDb.ts` - Acceso a BD
```ts
export async function getChatDB() {
  // Crear tabla si no existe
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      plan_id INTEGER NOT NULL
    )
  `);

  return {
    // INSERT - devuelve ID generado
    run: async (sql, params) => {
      const result = await pool.query(sql + ' RETURNING id', params);
      return { lastID: result.rows[0].id };
    },
    
    // SELECT - devuelve array de filas
    all: async (sql, params) => {
      const result = await pool.query(sql, params);
      return result.rows;
    }
  };
}
```

**Importante:**
- ✅ `$1, $2, $3` - Placeholders de PostgreSQL (no `?`)
- ✅ `RETURNING id` - Obtener ID del INSERT
- ✅ Tabla auto-creada en primera conexión

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
4. socket.emit('chat_message', "Hola", "Juan", 123)
   ↓
5. Backend recibe en chat.controller.ts
   ↓
6. INSERT INTO messages (content, user_name, plan_id)
   VALUES ('Hola', 'Juan', 123)
   ↓
7. io.to('plan_123').emit('chat_message', "Hola", ID, "Juan")
   ↓
8. Frontend recibe → setMessages([...prev, {content, user_name}])
   ↓
9. Render: aparece el mensaje en el chat
   ↓
10. scrollIntoView({ behavior: 'smooth' }) → scroll automático
```

### Conexión Socket.IO
```
1. Cliente abre ChatPlan
   ↓
2. useChat hook ejecuta useEffect
   ↓
3. io(backendUrl, { auth: { serverOffset: 0, planId: 123 } })
   ↓
4. Backend: io.on('connection', socket => registerChatHandlers)
   ↓
5. socket.on('join_plan', planId) → socket.join('plan_123')
   ↓
6. Si es reconexión (!socket.recovered):
     SELECT * FROM messages WHERE id > serverOffset AND plan_id = 123
   ↓
7. socket.emit('chat_message', ...) → enviar historial
   ↓
8. Frontend recibe mensajes históricos
   ↓
9. setMessages([...históricos]) → mostrar conversación anterior
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
  user_name VARCHAR(100) NOT NULL,
  plan_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()  -- Opcional
);

-- Índices útiles
CREATE INDEX idx_messages_plan_id ON messages(plan_id);
CREATE INDEX idx_messages_id_plan ON messages(id, plan_id);
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

3. **Clickear botón chat**
   - Se abre modal
   - useChat hook establece WebSocket
   - Socket.IO emite `join_plan`
   - Backend carga mensajes históricos

4. **Escribir mensaje**
   - Input captura texto
   - Form submit → sendMessage()
   - Socket.IO emite a servidor
   - Servidor guarda en BD
   - Servidor broadcast a todos en sala
   - Chat recibe y renderiza

5. **Cerrar/Reconectar**
   - Click X o backdrop cierra modal
   - Component unmount → socket.disconnect()
   - Si pierde conexión:
     - Socket.IO reintenta automáticamente
     - Envía serverOffset para recuperar mensajes nuevos

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

## 📊 Comparativa: Simple vs Compleja

| Aspecto | Simple (legacy) | Compleja (doc) |
|---------|-----------------|----------------|
| Modal | Sí | No (página dedicada) |
| Rutas dinámicas | No | Sí (`/plan-chat/[id]`) |
| Typing indicators | No | No (future) |
| Avatar users | No | Opcional |
| Timestamps | No | Sí |
| Búsqueda | No | No (future) |
| Archivos/imgs | No | No (future) |

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
