import { Server, Socket } from 'socket.io';
import { getChatDB } from '../lib/chatDb';

export async function registerChatHandlers(io: Server, socket: Socket) {
  const chatDb = await getChatDB();

  // Unirse a sala por Plan
  socket.on('join_plan', (planId: number) => {
    socket.join(`plan_${planId}`);
  });

  // Manejo de mensajes nuevos
  socket.on('chat_message', async (msg: string, user: string, planId: number) => {
    try {
      const result = await chatDb.run(
        'INSERT INTO messages (content, user_name, plan_id) VALUES (?, ?, ?)',
        [msg, user, planId]
      );
      
      io.to(`plan_${planId}`).emit('chat_message', msg, result.lastID?.toString(), user);
    } catch (e) {
      console.error('Error en socket chat:', e);
    }
  });

  // Recuperación de historial offline[cite: 3]
  if (!socket.recovered) {
    try {
      const lastId = socket.handshake.auth.serverOffset || 0;
      const planId = socket.handshake.auth.planId;
      if (planId) {
        const results = await chatDb.all(
          'SELECT id, content, user_name FROM messages WHERE id > ? AND plan_id = ?',
          [lastId, planId]
        );
        results.forEach(row => {
          socket.emit('chat_message', row.content, row.id.toString(), row.user_name);
        });
      }
    } catch (e) {}
  }
}