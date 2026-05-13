# Cómo funciona el Chat en Planazo

## ¿Qué es?
El chat es la funcionalidad que permite que las personas que se apuntaron a un plan se comuniquen en tiempo real. Es decir, todos los participantes de un plan pueden escribirse mensajes sin esperar a que recarguen la página.

## ¿Cómo lo hemos hecho?

### La idea principal
Usamos **Socket.IO** para hacer que el chat funcione en tiempo real. Socket.IO es una librería que permite que el servidor y los clientes hablen "de verdad" (no es enviar un formulario y esperar).

Además, guardamos los mensajes en **PostgreSQL** para que cuando alguien entre más tarde, pueda ver el historial del chat.

### Frontend: Interfaz y Conexión

#### 1. El usuario se conecta
Cuando entras a ver un plan, el frontend crea una conexión Socket.IO con el backend. Es como levantar el teléfono para poder hablar.

```javascript
// El frontend hace esto:
const socket = io('http://localhost:3001', {
  auth: { userId: 123 } // Enviamos quién somos
});
```

#### 2. El usuario pide entrar a la sala del chat
Cuando ves los comentarios de un plan, el frontend le pide al backend: "Quiero ver el chat del plan 5".

```javascript
// El frontend hace:
socket.emit('join_plan', 5);
```

#### 3. El usuario escribe un mensaje
Cuando haces clic en enviar:

```javascript
// El frontend hace:
socket.emit('chat_message', "Hola a todos!", "TuNombre", 5);
```

#### 4. El frontend recibe y muestra mensajes
Cuando llega un mensaje nuevo, el frontend lo añade a la lista de mensajes en la interfaz.

```javascript
// El frontend escucha:
socket.on('new_message', (message) => {
  // Añade el mensaje a la lista y actualiza la UI
  setMessages(prev => [...prev, message]);
});
```

### Backend: Lógica del Servidor

#### 1. El backend valida y acepta la conexión
El backend comprueba:
- ¿Quién eres? (Lee tu userId del handshake)
- ¿Estás apuntado a este plan? (Busca en la base de datos)

Si todo ok, lo añade a la "sala" del plan. Es como entrar a una sala en Discord.

#### 2. El backend procesa el mensaje
El backend:
- Valida que sigas siendo participante del plan
- Guarda el mensaje en PostgreSQL con: contenido, tu usuario, el plan, la hora
- Obtiene tu avatar del perfil
- Envía el mensaje a TODOS los que están en esa sala

```javascript
// El backend hace:
io.to('plan_5').emit('new_message', {
  id: 123,
  content: "Hola a todos!",
  user: "TuNombre",
  avatar: "https://...",
  created_at: "2024-05-13T15:30:00"
});
```

---

## ¿Dónde está el código?

| Controladores de Socket.IO | `backend/src/controllers/chat.controller.ts` |
| Conexión a la BD | `backend/src/lib/chatDb.ts` |
| Tabla de mensajes | `backend/sql/init.sql` |
| Componente del frontend | `frontend/app/components/ChatPlan.tsx` (el que muestra el chat) |
| Hook del frontend | `frontend/app/hooks/useChat.ts` |

---

## ¿Por qué PostgreSQL?

**Toda la aplicación usa PostgreSQL** para almacenar todos los datos:
- Usuarios y contraseñas
- Planes y sus participantes
- Mensajes del chat
- Todo lo demás

PostgreSQL es una base de datos profesional muy escalable, perfecta para aplicaciones reales que deben soportar muchos usuarios conectados simultáneamente.

### El "wrapper" de chatDb.ts


```typescript
// Sin el wrapper, el código del chat sería:
pool.query('INSERT INTO messages (...) RETURNING id', params);

// Con el wrapper, es así:
chatDb.run('INSERT INTO messages (...)', params);
```

El wrapper proporciona dos métodos simples:
- `run()` → para INSERT/UPDATE/DELETE
- `all()` → para SELECT

**¿Por qué molestarse con esto?**

1. **Código más limpio**: El controller no necesita detalles de la BD
2. **Flexibilidad**: Si mañana queremos cambiar algo, solo cambiamos `chatDb.ts`
3. **Consistencia**: El mismo estilo de código en todo el proyecto

---

## Seguridad:

No podemos dejar que cualquiera vea cualquier chat. Por eso hacemos validación DOS veces:

1. **Cuando se une a la sala** (`join_plan`): Verificamos que estés apuntado al plan
2. **Cuando envía mensajes** (`chat_message`): Verificamos OTRA VEZ que sigas apuntado

¿Por qué dos veces? Porque alguien podría:
- Apuntarse a un plan
- Abrir el chat
- Salirse del plan
- Y luego intentar enviar un mensaje


---

## Resumen con un ejemplo

Imagina que te apuntas a un plan:

1. Abres el detalle del plan → Tu navegador conecta con Socket.IO
2. Se carga el chat → Tu navegador entra a la sala del plan
3. Escribes "Hola!" → Se envía por Socket.IO
4. El backend guarda el mensaje en PostgreSQL y lo envía a todos
5. Los otros 4 participantes lo ven aparecer en sus pantallas

Y si recarga la página (o entras mañana), PostgreSQL guarda el historial de todo lo que se escribió.
