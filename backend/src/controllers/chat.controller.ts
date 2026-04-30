import { Server, Socket } from 'socket.io';
import { getChatDB } from '../lib/chatDb';

/**
 * registerChatHandlers - Registra todos los manejadores de eventos del chat
 * 
 * Eventos:
 * - join_plan: Usuario se une a una sala de chat de un plan
 * - chat_message: Usuario envía un mensaje al plan
 * - Recuperación offline: Enviar mensajes no recibidos cuando reconecta
 */
export async function registerChatHandlers(io: Server, socket: Socket) {
  const chatDb = await getChatDB();
  const socketId = socket.id;
  
  console.log(`[Chat] Nueva conexión: ${socketId}`);

  /**
   * EVENT: join_plan
   * Usuario se une a la sala de chat de un plan específico
   * Las salas de Socket.IO permiten "broadcast" solo a usuarios en esa sala
   */
  socket.on('join_plan', (planId: number) => {
    console.log(`[Chat] ${socketId} se unió al plan ${planId}`);
    socket.join(`plan_${planId}`);
  });

  /**
   * EVENT: chat_message
   * Usuario envía un mensaje al plan
   * El mensaje se guarda en BD y se emite a todos en la sala del plan
   */
  socket.on('chat_message', async (msg: string, user: string, planId: number) => {
    try {
      console.log(`[Chat] Plan ${planId} | ${user}: ${msg}`);
      
      // Guardar mensaje en base de datos
      const result = await chatDb.run(
        'INSERT INTO messages (content, user_name, plan_id) VALUES (?, ?, ?)',
        [msg, user, planId]
      );
      
      // Emitir el mensaje a todos los clientes en la sala del plan
      io.to(`plan_${planId}`).emit(
        'chat_message', 
        msg,                              // Contenido del mensaje
        result.lastID?.toString(),        // ID del mensaje en BD
        user                              // Usuario que envió
      );
    } catch (e) {
      console.error('[Chat] Error al guardar mensaje:', e);
    }
  });

  /**
   * RECUPERACIÓN OFFLINE
   * Cuando el cliente reconecta después de desconexión:
   * 1. Socket.IO detecta que hay un "offset" guardado (último mensaje recibido)
   * 2. Enviamos todos los mensajes posteriores al cliente
   * Esto permite al usuario ver mensajes que se enviaron mientras estaba offline
   */
  if (!socket.recovered) {
    try {
      const lastId = socket.handshake.auth.serverOffset || 0;
      const planId = socket.handshake.auth.planId;
      
      if (planId) {
        console.log(`[Chat] Recuperando mensajes del plan ${planId} desde ID ${lastId}`);
        
        // Obtener mensajes posteriores al último recibido
        const results = await chatDb.all(
          'SELECT id, content, user_name FROM messages WHERE id > ? AND plan_id = ?',
          [lastId, planId]
        );
        
        console.log(`[Chat] Enviando ${results.length} mensajes recuperados`);
        
        // Emitir cada mensaje al cliente para su histórico
        results.forEach(row => {
          socket.emit('chat_message', row.content, row.id.toString(), row.user_name);
        });
      }
    } catch (e) {
      console.error('[Chat] Error en recuperación offline:', e);
    }
  }
  
  // Cuando el usuario se desconecta
  socket.on('disconnect', () => {
    console.log(`[Chat] ${socketId} desconectado`);
  });
}