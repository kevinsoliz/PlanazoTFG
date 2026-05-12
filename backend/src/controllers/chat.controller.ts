import { Server, Socket } from 'socket.io';
import { getChatDB } from '../lib/chatDb';
import { obtener as obtenerPerfil } from '../services/perfiles.service';
import { esParticipanteEnPlan } from '../services/planes.service';

/**
 * ============================================================================
 * MANEJADORES DE EVENTOS SOCKET.IO PARA CHAT EN TIEMPO REAL
 * ============================================================================
 * Esta función registra todos los manejadores de eventos de Socket.IO para:
 * 1. Unirse a salas de chat de planes (join_plan)
 * 2. Manejar nuevos mensajes de chat (chat_message)
 * 3. Recuperar historial de mensajes para desconexiones (connection state recovery)
 *
 * SEGURIDAD: Se valida participación en plan en 2 puntos para evitar:
 * - Escuchar chats sin estar apuntado (validación en join_plan)
 * - Enviar mensajes sin estar apuntado (validación en chat_message)
 * ============================================================================
 */
export async function registerChatHandlers(io: Server, socket: Socket) {
  // Obtener instancia de base de datos SQLite para almacenar mensajes
  const chatDb = await getChatDB();

  // ============================================================================
  // PASO 1: EVENTO 'join_plan' - Usuario solicita unirse a sala de chat
  // ============================================================================
  // Ejecutado cuando el cliente hace: socket.emit('join_plan', planId)
  // Validamos que el usuario esté inscrito en el plan ANTES de permitir acceso
  socket.on('join_plan', async (planId: number) => {
    // PASO 1.1: Extraer userId del handshake (autenticación inicial)
    // El handshake.auth contiene los datos que envió el cliente al conectarse
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      // Si no hay userId, el socket no está autenticado
      // Abandonamos sin emitir error (fallo silencioso por seguridad)
      return;
    }

    // PASO 1.2: Validar que el usuario sea PARTICIPANTE del plan
    // Consulta BD: SELECT 1 FROM plan_participants WHERE plan_id = ? AND user_id = ?
    // SEGURIDAD #1: Evita que alguien escuche un plan sin estar apuntado
    const participante = await esParticipanteEnPlan(planId, userId);
    if (!participante) {
      // Usuario no está apuntado a este plan
      // No lo añadimos a la sala de Socket.IO
      return;
    }

    // PASO 1.3: Unir el socket a la sala específica del plan
    // Ahora este socket recibe todos los emit() dirigidos a `plan_${planId}`
    // Ejemplo: si hay 5 usuarios en plan_1, Socket.IO gestiona 5 conexiones en esa sala
    socket.join(`plan_${planId}`);
  });

  // ============================================================================
  // PASO 2: EVENTO 'chat_message' - Usuario envía un mensaje en el chat
  // ============================================================================
  // Ejecutado cuando el cliente hace: socket.emit('chat_message', msg, user, planId)
  socket.on('chat_message', async (msg: string, user: string, planId: number) => {
    try {
      // PASO 2.1: Extraer userId de autenticación (igual que join_plan)
      const userId = socket.handshake.auth.userId;
      if (!userId) {
        // Sin autenticación, no procesamos el mensaje
        return;
      }

      // PASO 2.2: Validar SEGUNDA VEZ que sea participante
      // ¿Por qué dos veces? Porque alguien podría haber salido del plan entre
      // join_plan y este evento, queremos evitar que envíe mensajes
      // SEGURIDAD #2: Evita que alguien envíe mensajes sin estar apuntado
      const participante = await esParticipanteEnPlan(planId, userId);
      if (!participante) {
        // Usuario no está en plan o salió después de join_plan
        return;
      }

      // PASO 2.3: Obtener información completa del usuario (avatar)
      // Consultamos tabla perfiles para traer avatar_url
      // El frontend solo envía nombre, pero necesitamos más datos para el chat
      const perfil = await obtenerPerfil(userId);
      const avatar = perfil.avatar_url;

      // PASO 2.4: INSERTAR MENSAJE EN BASE DE DATOS
      // Almacenamos: contenido, quién lo escribió (user_id), en qué plan
      // SQLite genera automáticamente:
      // - id (AUTOINCREMENT)
      // - created_at (TIMESTAMP DEFAULT NOW())
      const result = await chatDb.run(
        'INSERT INTO messages (content, user_id, plan_id) VALUES ($1, $2, $3)',
        [msg, userId, planId]
      );

      // PASO 2.5: OBTENER TIMESTAMP EXACTO del mensaje
      // Consultamos el timestamp que generó SQLite (con milisegundos precisos)
      // Si algo falla, usamos la hora actual del servidor como fallback
      const createdRows = await chatDb.all(
        'SELECT created_at FROM messages WHERE id = $1',
        [result.lastID]
      );
      const createdAt = createdRows[0]?.created_at ?? new Date().toISOString();

      // PASO 2.6: EMITIR MENSAJE A TODOS EN LA SALA
      // io.to(`plan_${planId}`) = enviar a TODOS los clientes en esa sala
      // Incluye al que envió el mensaje (para confirmación inmediata)
      // Incluye a otros usuarios en el plan (para que vean el mensaje)
      io.to(`plan_${planId}`).emit(
        'chat_message',
        msg,                           // Contenido del mensaje
        result.lastID?.toString(),     // ID único (usado para recuperación offline)
        user,                          // Nombre del usuario que escribió
        avatar,                        // Avatar para mostrar en UI
        new Date(createdAt).toISOString(), // Timestamp ISO para zona horaria local del usuario
        userId                         // userId para que frontend identifique mensajes propios
      );
    } catch (e) {
      // Cualquier error (BD, consulta de perfil, etc.) se registra
      // No se envía error al cliente (para no exponer detalles internos)
      console.error('Error en socket chat:', e);
    }
  });

  // ============================================================================
  // PASO 3: CONNECTION STATE RECOVERY - Recuperar mensajes perdidos
  // ============================================================================
  // Socket.IO está configurado con connectionStateRecovery en index.ts
  // Si usuario se desconecta y reconecta rápido (< timeout):
  // - socket.recovered = true → recuperación automática, obtener nuevos mensajes
  // - socket.recovered = false → reconexión nueva, solo obtener histórico
  // ============================================================================
  if (!socket.recovered) {
    try {
      // PASO 3.1: OBTENER PUNTO DE RECUPERACIÓN
      // serverOffset = ID del último mensaje que cliente ya recibió
      // Si es primera conexión o timeout, será 0 (obtener todos)
      const lastId = socket.handshake.auth.serverOffset || 0;

      // PASO 3.2: OBTENER PLAN DEL CLIENTE
      // planId viene en el handshake, necesario para saber qué mensajes traer
      const planId = socket.handshake.auth.planId;
      if (planId) {
        // PASO 3.3: CONSULTAR MENSAJES NUEVOS EN BD
        // WHERE id > lastId: traer solo mensajes más nuevos que los que ya tiene
        // ORDER BY id ASC: enviarlos en orden cronológico
        // Ejemplo: si cliente tiene hasta ID 5, obtenemos 6, 7, 8, etc.
        const results = await chatDb.all(
          'SELECT id, content, user_id, created_at FROM messages WHERE id > $1 AND plan_id = $2 ORDER BY id ASC',
          [lastId, planId]
        );

        // PASO 3.4: PARA CADA MENSAJE, EMITIR INDIVIDUALMENTE
        // No usamos io.to() aquí (eso sería a toda la sala)
        // socket.emit() = enviar SOLO a este cliente
        // Motivo: es recuperación, no difusión (cliente ya estaba conectado)
        for (const row of results) {
          // PASO 3.4a: Obtener perfil de quien escribió el mensaje
          // Necesitamos nombre y avatar para mostrar historial completo
          const perfil = await obtenerPerfil(row.user_id);

          // PASO 3.4b: Enviar cada mensaje histórico al cliente
          // Mismo formato que chat_message en vivo, para compatibilidad UI
          socket.emit(
            'chat_message',
            row.content,
            row.id.toString(),
            perfil.nombre,
            perfil.avatar_url,
            new Date(row.created_at).toISOString(),
            row.user_id
          );

          // Frontend actualiza serverOffset tras cada mensaje
          // Así next time se reconecte, empezará desde aquí
        }
      }
    } catch (e) {
      // Error en recuperación: registrar y continuar
      // No interrumpir la conexión del usuario
      console.error('Error en recuperación de historial:', e);
    }
  }
  // ============================================================================
  // FIN DE MANEJADORES DE EVENTOS
  // ============================================================================
}