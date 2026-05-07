import pool from '../db';
// Interfaz simple para ejecutar consultas SQL
export async function getChatDB() {
  // Creamos la tabla de mensajes si no existe
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users(id),
      plan_id INTEGER NOT NULL REFERENCES planes(id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Aseguramos el campo nuevo en tablas existentes
  await pool.query(
    'ALTER TABLE messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW()'
  );

  // Devolvemos una interfaz simple para ejecutar consultas
  return {
    run: async (sql: string, params: any[]) => {
      // Detectamos si es una consulta de inserción para devolver el ID insertado
      if (sql.trim().toUpperCase().startsWith('INSERT')) {
        // En PostgreSQL, usamos RETURNING para obtener el ID del nuevo registro
        const result = await pool.query(sql + ' RETURNING id', params);
        return { lastID: result.rows[0]?.id };
      }
      const result = await pool.query(sql, params);
      return { lastID: result.rowCount };
    },
    all: async (sql: string, params: any[]) => {
      const result = await pool.query(sql, params);
      return result.rows;
    }
  };
}
