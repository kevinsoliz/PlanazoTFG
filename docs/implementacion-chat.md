# Implementación Chat en Tiempo Real

## 📌 Resumen
Chat con Socket.IO para comunicación bidireccional, PostgreSQL para persistencia, DaisyUI para UI moderna, avatares de usuario, timestamps y colores únicos por usuario.
- Restricción de escritura: solo usuarios apuntados pueden escribir en el chat.
- Validación de participación en backend en `join_plan` y `chat_message`.

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
│  Plan 2  [chat btn]     │
│  Plan 3  [chat btn]     │
└─────────────────────────┘
```
- En esta página hay un botón de chat para cada plan al que estás apuntado.
- El botón navega directamente a la página de detalle del plan (`/home/[id]`).
- Esto proporciona mejor experiencia en móvil, URLs compartibles e historial de navegación natural.

### 2. Página de detalle del plan (`/home/[id]`)
```
┌──────────────────────────────┐
│  Título del plan             │
├──────────────────────────────┤
│  [Avatar] User1: Hola        │
│                    [Avatar] Yo│
│                    Hola       │
│  [Avatar] User1: ¿Qué tal?   │
│                    14:30     │
├──────────────────────────────┤
│  [Input mensaje] [btn enviar]│
└──────────────────────────────┘
```
- La página de detalle del plan integra directamente el chat del plan.
- Solo los usuarios apuntados pueden escribir, el input se deshabilita para los no-participantes.

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
│   │       │   └── ChatModalBtn.tsx        ✅ Botón que navega a /home/[id]
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

### `ChatModalBtn.tsx` - Botón que navega a la página del plan
```tsx
export default function ChatModalBtn({ planId, userName, userId, planTitulo }) {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push(`/home/${planId}`)}
      className="btn btn-primary btn-xs"
      aria-label={`Abrir chat del plan ${planTitulo}`}
    >
      <BsChatFill className="size-4" />
    </button>
  );
}
```

**Cambios recientes:**
- Ahora es un botón de navegación que dirige a `/home/[id]` en lugar de abrir un modal
- Usa `next/navigation` useRouter para la navegación
- Simplifica la experiencia del usuario en móvil evitando issues de viewport con el teclado

### `ChatPlan.tsx` - Componente principal del chat (DaisyUI)
```tsx
export default function ChatPlan({ planId, userName, userId, canWrite }) {
  const { messages, sendMessage } = useChat(planId, userName, userId);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canWrite) return;
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      form.reset();
    }
  };

  return (
    <>
      <div 
        ref={messagesContainerRef} 
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-neutral/5"
      >
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
      </div>

      {!canWrite && (
        <div className="px-4 py-3 text-sm text-neutral">
          Solo los usuarios apuntados pueden escribir en este chat.
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-neutral/20 flex gap-2 bg-base-100 shrink-0"
      >
        <input 
          name="message" 
          disabled={!canWrite}
          className="input input-bordered flex-1 rounded-full px-4" 
          placeholder={canWrite ? "Escribe un mensaje..." : "Debes apuntarte para escribir"}
          autoComplete="off"
          inputMode="text"
        />
        <button type="submit" disabled={!canWrite} className="btn btn-primary btn-circle bg-neutral disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.519 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </>
  );
}
```

**Props:**
- `planId` (number) - ID del plan
- `userName` (string) - Nombre del usuario actual
- `userId` (number) - ID del usuario actual
- `canWrite` (boolean) - Permiso para habilitar el input de envío

**Características:**
- Usa componentes DaisyUI (`chat`, `chat-start/end`, `chat-image`, etc.)
- Avatares de usuario desde perfiles
- Colores únicos por usuario usando HSL
- Timestamps formateados en español
- Auto-scroll al último mensaje
- Input y botón deshabilitados para usuarios no apuntados

---

### `useChat.ts` - Hook que maneja Socket.IO
```tsx
export function useChat(planId: number, userName: string, userId: number) {
  const [messages, setMessages] = useState<{content: string, user_name: string, avatar: string | null, created_at: string, user_id: number}[]>([]);
  const socketRef = useRef<CustomSocket | null>(null);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    socketRef.current = io(backendUrl, {
      auth: {
        serverOffset: 0,
        planId,
        userId
      }
    }) as CustomSocket;

    socketRef.current.emit('join_plan', planId);

    socketRef.current.on(
      'chat_message',
      (msg: string, id: string, user: string, avatar: string | null, createdAt: string, userId: number) => {
        setMessages((prev) => [
          ...prev,
          { content: msg, user_name: user, avatar, created_at: createdAt, user_id: userId }
        ]);

        if (socketRef.current) {
          socketRef.current.auth.serverOffset = id;
        }
      }
    );

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
5. **Send**: Emite `chat_message(content, userName, planId)` con parámetros separados

---

## � Optimización Móvil

### Manejo del teclado virtual
En móviles, la `ChatPlan` usa una estructura flex que:
- `min-h-0` en el contenedor de mensajes previene overflow y permite que el teclado no oculte el input
- `shrink-0` en el formulario evita que se comprima cuando el teclado aparece
- `overflow-y-auto` independiente en mensajes permite scroll sin afectar el input
- `inputMode="text"` en el input optimiza el tipo de teclado móvil

### Por qué navegación en lugar de modal
- **Mobile-first**: Navegar a página nueva evita conflictos de viewport con el teclado
- **URLs compartibles**: Los usuarios pueden compartir el enlace del chat
- **Historial**: El botón atrás funciona de forma natural
- **Simpler**: Menos JavaScript, menos estado, mejor performance

---

## 🔮 Mejoras Futuras

### Modal de chat (alternativa a navegación)
En lugar de navegar a una página nueva, se podría implementar un modal que:
- Abra directamente desde el botón chat sin cambiar de página
- Mantenga la URL base (`/mis-planes` o donde sea que esté el botón)
- Muestre el `ChatPlan` dentro de un modal DaisyUI

**Consideraciones:**
- Requeriría manejo especial del teclado móvil (visualViewport API)
- Sería más complejo pero permitiría multi-tasking en desktop
- Menos mobile-friendly que la navegación actual

### Otras mejoras potenciales
- Indicador de "escribiendo..." en tiempo real
- Reacciones a mensajes (emojis)
- Búsqueda y filtrado de mensajes históricos
- Notificaciones push de nuevos mensajes
- Archivos/imágenes en el chat

---

## �🖥️ Backend - Socket.IO Handlers

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

  // 1. Usuario solicita unirse a la sala
  socket.on('join_plan', async (planId) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return;

    const participante = await esParticipanteEnPlan(planId, userId);
    if (!participante) return;

    socket.join(`plan_${planId}`);
  });

  // 2. Nuevo mensaje
  socket.on('chat_message', async (msg, user, planId) => {
    try {
      const userId = socket.handshake.auth.userId;
      if (!userId) return;

      const participante = await esParticipanteEnPlan(planId, userId);
      if (!participante) return;

      const perfil = await obtenerPerfil(userId);
      const avatar = perfil.avatar_url;

      const result = await chatDb.run(
        'INSERT INTO messages (content, user_id, plan_id) VALUES ($1, $2, $3)',
        [msg, userId, planId]
      );

      const createdRows = await chatDb.all(
        'SELECT created_at FROM messages WHERE id = $1',
        [result.lastID]
      );
      const createdAt = createdRows[0]?.created_at ?? new Date().toISOString();

      io.to(`plan_${planId}`).emit(
        'chat_message',
        msg,
        result.lastID?.toString(),
        user,
        avatar,
        createdAt,
        userId
      );
    } catch (e) {
      console.error('Error sending message:', e);
    }
  });

  // 3. Recuperación de historial offline
  if (!socket.recovered) {
    try {
      const lastId = socket.handshake.auth.serverOffset || 0;
      const planId = socket.handshake.auth.planId;
      if (planId) {
        const results = await chatDb.all(
          'SELECT id, content, user_id, created_at FROM messages WHERE id > $1 AND plan_id = $2 ORDER BY id ASC',
          [lastId, planId]
        );

        for (const row of results) {
          const perfil = await obtenerPerfil(row.user_id);
          socket.emit(
            'chat_message',
            row.content,
            row.id.toString(),
            perfil.nombre,
            perfil.avatar_url,
            row.created_at,
            row.user_id
          );
        }
      }
    } catch (e) {
      console.error('Error en recuperación de historial:', e);
    }
  }
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
1. Usuario escribe "Hola" y da click al botón enviar
   ↓
2. handleSubmit() en ChatPlan captura el evento
   ↓
3. sendMessage("Hola") del hook useChat
   ↓
4. socket.emit('chat_message', msg, userName, planId)
   ↓
5. Backend recibe en chat.controller.ts en socket.on('chat_message')
   ↓
6. Valida userId desde socket.handshake.auth.userId
   ↓
7. Verifica que el usuario sea participante del plan
   ↓
8. Consulta perfil: SELECT avatar_url FROM perfiles WHERE user_id = ?
   ↓
9. INSERT INTO messages (content, user_id, plan_id) VALUES ('Hola', userId, 123)
   ↓
10. io.to('plan_123').emit('chat_message', msg, messageId, userName, avatar, createdAt, userId)
    ↓
11. Frontend recibe en useChat hook → setMessages([...prev, mensajeCompleto])
    ↓
12. Render: aparece mensaje con avatar, color único, timestamp en ChatPlan
    ↓
13. scrollToBottom() → scroll automático al último mensaje
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

3. **Clickear botón chat**
   - Navega a `/home/[id]` del plan
   - Se carga la página con el componente `ChatPlan`
   - `useChat` hook establece WebSocket con autenticación `userId`
   - Socket.IO emite `join_plan` con ID del plan
   - Backend valida `userId`, verifica participación y carga mensajes históricos con avatares y timestamps

4. **Escribir mensaje**
   - Solo usuarios apuntados pueden escribir (input habilitado)
   - Form submit → `sendMessage()`
   - Socket.IO emite mensaje estructurado a servidor
   - Servidor valida usuario, consulta avatar, guarda en BD
   - Servidor broadcast a todos en sala con datos completos
   - Frontend renderiza con avatar, color único y hora

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
