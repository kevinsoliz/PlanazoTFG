import pool from '../db';
// Interfaz simple para ejecutar consultas SQL
export async function getChatDB() {
  // Creamos la tabla de mensajes si no existe

  // Devolvemos una interfaz simple para ejecutar consultas
  return {
// INSERT 
    insertMessage: async ({ content, user_id, plan_id }: { content: string, user_id: number, plan_id: number }) => {
      const result = await pool.query(
        'INSERT INTO messages (content, user_id, plan_id) VALUES ($1, $2, $3) RETURNING id, created_at',
        [content, user_id, plan_id]
      );
      return result.rows[0];
    },

    // SELECT 
    getMessagesByPlan: async (planId: number) => {
      const result = await pool.query(
        'SELECT id, content, user_id, created_at FROM messages WHERE plan_id = $1 ORDER BY created_at ASC',
        [planId]
      );
      return result.rows;
    }
  };
}
