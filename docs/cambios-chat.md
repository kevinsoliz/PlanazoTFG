# Cambios Realizados en el Sistema de Chat

## Resumen
Este documento detalla todos los cambios realizados para mejorar el sistema de chat de Planazo, incluyendo:
- Migración a DaisyUI con avatares, timestamps y colores únicos por usuario
- Restricción de acceso: solo usuarios apuntados pueden escribir en el chat
- Validación de participación en backend (seguridad de doble validación)
- Comentarios detallados paso a paso en controladores

## Versiones
- **v1.0**: Implementación inicial del chat con avatares y timestamps
- **v1.1**: Restricción de escritura - solo participantes del plan pueden escribir

## Cambios por Categoría

### 1. Base de Datos
**Archivo:** `backend/sql/init.sql`
- **Cambio:** Modificada la tabla `messages` para usar `user_id` (INTEGER REFERENCES users(id)) en lugar de `user_name` (VARCHAR).
- **Razón:** Mejor integridad referencial y preparación para funcionalidades avanzadas.
- **Impacto:** Requiere migración de datos existentes si los hay.

**Archivo:** `backend/src/lib/chatDb.ts`
- **Cambio:** Agregada columna `created_at TIMESTAMP DEFAULT NOW()` a la tabla `messages`.
- **Cambio:** Agregada consulta `ALTER TABLE` para asegurar la columna en tablas existentes.
- **Razón:** Almacenar timestamps de mensajes para mostrar fecha y hora.

### 2. Backend - Servicios
**Archivo:** `backend/src/services/planes.service.ts`
- **Cambio:** Agregada función `esParticipanteEnPlan(planId, userId): boolean`.
- **Consulta:** `SELECT 1 FROM plan_participants WHERE plan_id = ? AND user_id = ?`
- **Razón:** Validar que usuario esté inscrito en plan antes de permitir escribir en chat.
- **Impacto:** Base para la seguridad de doble validación en controlador de chat.

### 3. Backend - Controladores
**Archivo:** `backend/src/controllers/chat.controller.ts`
- **Cambio:** Evento `join_plan` - Validar participación ANTES de unir a sala.
  ```typescript
  const participante = await esParticipanteEnPlan(planId, userId);
  if (!participante) return; // Rechazar silenciosamente
  socket.join(`plan_${planId}`);
  ```
- **Cambio:** Evento `chat_message` - Validar participación ANTES de insertar mensaje.
  ```typescript
  const participante = await esParticipanteEnPlan(planId, userId);
  if (!participante) return; // No permitir envío
  ```
- **Cambio:** Agregados comentarios detallados PASO A PASO en toda la función.
  - Documentación completa de 3 secciones (join_plan, chat_message, recovery)
  - Explicación de cada paso con ejemplos
  - Puntos de seguridad marcados como SEGURIDAD #1, SEGURIDAD #2
- **Razón:** Doble validación previene escuchar y escribir sin estar apuntado.
- **Seguridad:** 
  - SEGURIDAD #1: Validación en `join_plan` - evita escuchar sin estar apuntado
  - SEGURIDAD #2: Validación en `chat_message` - evita escribir sin estar apuntado
  - Fallido silencioso por razones de seguridad (no expone información)

### 4. Frontend - Componentes
**Archivo:** `frontend/app/components/features/chat/ChatPlan.tsx`
- **Cambio:** Agregado prop `canWrite: boolean` para controlar permisos de escritura.
- **Cambio:** Deshabilitado input de texto cuando `canWrite = false`.
  ```tsx
  <input disabled={!canWrite} placeholder={canWrite ? "..." : "Debes apuntarte..."} />
  ```
- **Cambio:** Deshabilitado botón de envío cuando `canWrite = false`.
  ```tsx
  <button disabled={!canWrite} className="... disabled:opacity-50 disabled:cursor-not-allowed">
  ```
- **Cambio:** Agregado aviso visual para usuarios no-participantes.
  ```tsx
  {!canWrite && (
    <div>Solo los usuarios apuntados pueden escribir en este chat.</div>
  )}
  ```
- **Cambio:** Modificado `handleSubmit` para evitar envío si `canWrite = false`.
- **Razón:** Mejora UX y previene intentos de envío de no-participantes.

### 5. Frontend - Páginas
**Archivo:** `frontend/app/(app)/home/[id]/page.tsx`
- **Cambio:** Calculado `puedeEscribir` en base a `rolActual`.
  ```typescript
  const puedeEscribir = rolActual !== "no-participante";
  ```
- **Cambio:** Pasado `canWrite={puedeEscribir}` a componente `ChatPlan`.
- **Cambio:** Pasado `canWrite={puedeEscribir}` a componente `ChatPlan`.
- **Razón:** Determinar permisos en el servidor (seguro) y pasar al cliente.

### 6. Frontend - Hooks
**Archivo:** `frontend/app/hooks/useChat.ts`
- **Cambio:** Actualizada interfaz de mensajes para incluir `avatar`, `created_at` y `user_id`.
- **Cambio:** Modificado listener `chat_message` para recibir parámetros adicionales.
- **Cambio:** Agregada autenticación `userId` en socket auth.
- **Razón:** Sincronizar datos del backend con estado del frontend.

### 7. Frontend - Componentes Adicionales
**Archivo:** `frontend/app/components/features/planes/ChatModalBtn.tsx`
- **Cambio:** Agregado prop `userId` y pasado a `ChatPlan`.
- **Razón:** Proporcionar `userId` para funcionalidades de chat.

### 8. Frontend - Páginas Adicionales
**Archivo:** `frontend/app/(app)/mis-planes/page.tsx`
- **Cambio:** Obtenido `userId` desde `/api/auth/me` y pasado a `ChatModalBtn`.
- **Razón:** Disponibilidad de `userId` en todas las instancias de chat.

### 9. Frontend - Servicios
**Archivo:** `frontend/app/services/perfiles.ts`
- **Cambio:** Agregada validación en `getPerfil()` para manejar respuestas no autenticadas.
- **Razón:** Prevenir errores `TypeError` cuando el usuario no está logueado.

## Arquitectura del Sistema de Chat

### Flujo de Datos - Envío de Mensaje
1. **Autenticación Inicial:**
   - Cliente se conecta con `userId` en socket auth handshake
   
2. **Unirse a Sala (`join_plan`):**
   - Cliente emite: `socket.emit('join_plan', planId)`
   - **Validación #1:** Backend verifica `esParticipanteEnPlan(planId, userId)`
   - Si no es participante: rechaza silenciosamente (fallo seguro)
   - Si es participante: `socket.join('plan_${planId}')`

3. **Enviar Mensaje (`chat_message`):**
   - Cliente emite: `socket.emit('chat_message', msg, userName, planId)`
   - **Validación #2:** Backend verifica nuevamente participación
   - Obtiene perfil para avatar
   - Inserta en BD: `INSERT INTO messages (content, user_id, plan_id)`
   - BD genera: `id` (autoincrement), `created_at` (timestamp)
   - Emite a sala: `io.to('plan_${planId}').emit('chat_message', ...)`

4. **Recepción en Cliente:**
   - Todos los sockets en la sala reciben el evento
   - Frontend actualiza estado: `setMessages(prev => [...prev, newMsg])`
   - Actualiza `serverOffset` para recuperación

### Flujo de Datos - Recuperación Offline
1. **Desconexión/Reconexión:**
   - Socket.IO detecta reconexión con `connectionStateRecovery`
   - `socket.recovered = false` → reconexión nueva
   
2. **Backend obtiene mensajes pendientes:**
   - Consulta: `SELECT ... FROM messages WHERE id > lastId AND plan_id = ?`
   - Para cada mensaje: obtiene perfil del autor
   - Emite individualmente: `socket.emit('chat_message', ...)`

3. **Frontend sincróniza:**
   - Recibe cada mensaje histórico
   - Agrega a estado como si fuera en vivo
   - Mantiene orden cronológico

### Control de Permisos
```
┌─────────────────────────────────────┐
│ Usuario accede a plan_detail/[id]   │
├─────────────────────────────────────┤
│ Servidor calcula:                   │
│ - rolActual (creador/participante/) │
│   no-participante)                  │
│ - puedeEscribir = rolActual !== ... │
│   "no-participante"                 │
│                                     │
│ Pasa canWrite={puedeEscribir}       │
├─────────────────────────────────────┤
│ Cliente renderiza ChatPlan:         │
│ - Si canWrite=true:                 │
│   Input/botón HABILITADOS           │
│   handleSubmit() envía mensaje      │
│ - Si canWrite=false:                │
│   Input/botón DESHABILITADOS        │
│   Aviso: "Solo apuntados pueden..." │
│   handleSubmit() retorna sin enviar │
├─────────────────────────────────────┤
│ Backend (double-check):             │
│ - join_plan: valida esParticipante  │
│ - chat_message: valida nuevamente   │
│ - Si no es participante: return     │
│   (no entra a sala, no envía)       │
└─────────────────────────────────────┘
```

### Componentes DaisyUI Utilizados
- `chat`: Contenedor principal
- `chat-start` / `chat-end`: Alineación (izquierda/derecha)
- `chat-image`: Avatar del usuario
- `chat-header`: Nombre del usuario
- `chat-bubble`: Contenido del mensaje
- `chat-footer`: Timestamp

### Generación de Colores
- Algoritmo: HSL con hue = (userId * 137.5) % 360
- Lightness: 88% (colores claros)
- Saturation: 65% (saturación media)
- Resultado: Colores únicos y consistentes por usuario

## Consideraciones Técnicas

### Validación de Participación
- **Punto 1 (join_plan):** Evita que alguien escuche un chat sin estar apuntado
  - Rechaza silenciosamente (por seguridad, no expone información)
  - Usuario nunca entra a la sala de Socket.IO
  
- **Punto 2 (chat_message):** Evita que alguien envíe mensajes sin estar apuntado
  - Incluso si intenta enviar directamente vía socket
  - Consulta BD nuevamente (podría haber salido del plan)
  - Fallo seguro: no inserta, no emite

### Compatibilidad
- Requiere migración de base de datos para tablas `messages` existentes.
- Compatible con DaisyUI 5.5.19+.
- Funciona con Socket.IO con `connectionStateRecovery`.

### Rendimiento
- Consultas adicionales a tabla `perfiles` por mensaje en historial.
- Generación de colores en cliente (ligero overhead).
- Validaciones de participación: rápidas (índice en `plan_id, user_id`).
- Optimizado con `useRef` para socket connection.

### Seguridad
- **Autenticación:** `userId` extraído de handshake validado.
- **Autorización (Doble Validación):**
  - `join_plan` → `esParticipanteEnPlan()` → socket.join()
  - `chat_message` → `esParticipanteEnPlan()` → INSERT
- **UI Validation:** Frontend deshabilita botones (conveniente, no seguro).
- **Backend Validation:** Punto de verdad, rechaza operaciones no autorizadas.
- **Fallido Seguro:** No expone detalles de error (no dice "no eres miembro").

## Próximos Pasos Sugeridos
- Implementar paginación para historial largo.
- Agregar indicadores de "escribiendo...".
- Soporte para mensajes multimedia.
- Notificaciones push para nuevos mensajes.
- Borrado de mensajes (solo autor/admin).
- Edición de mensajes.
