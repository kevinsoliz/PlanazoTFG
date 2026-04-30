import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getChatDB() {
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      user_name TEXT NOT NULL,
      plan_id INTEGER NOT NULL
    )
  `);
  return db;
}