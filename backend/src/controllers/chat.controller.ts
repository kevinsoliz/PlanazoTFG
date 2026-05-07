import { Server, Socket } from 'socket.io';
import { getChatDB } from '../lib/chatDb';
import { obtener as obtenerPerfil } from '../services/perfiles.service';

export async function registerChatHandlers(io: Server, socket: Socket) {
  const chatDb = await getChatDB();

  // Unirse a sala por Plan
  socket.on('join_plan', (planId: number) => {
    socket.join(`plan_${planId}`);
  });

  // Manejo de mensajes de chat
  socket.on('chat_message', async (msg: string, user: string, planId: number) => {
    try {
      const userId = socket.handshake.auth.userId; // Obtenemos el userId del cliente a través de la autenticación en el handshake
      if (!userId) return; // or handle error

      const perfil = await obtenerPerfil(userId); // Obtenemos el perfil del usuario para obtener su avatar
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
        createdAt
      );
    } catch (e) {
      console.error('Error en socket chat:', e);
    }
  });

  // Recuperación de historial offline
  if (!socket.recovered) {
    try {
      const lastId = socket.handshake.auth.serverOffset || 0; // ID del último mensaje recibido por el cliente
      const planId = socket.handshake.auth.planId; // ID del plan al que se unió el cliente
      if (planId) {
        const results = await chatDb.all(
          'SELECT id, content, user_id, created_at FROM messages WHERE id > $1 AND plan_id = $2',
          [lastId, planId]
        );
        // Enviamos cada mensaje al cliente, incluyendo el nombre de usuario, avatar y timestamp
        for (const row of results) {
          const perfil = await obtenerPerfil(row.user_id);
          socket.emit(
            'chat_message',
            row.content,
            row.id.toString(),
            perfil.nombre,
            perfil.avatar_url,
            row.created_at
          );
        }
      }
    } catch (e) {}
  }
}