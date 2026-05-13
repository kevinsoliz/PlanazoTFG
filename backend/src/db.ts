import { Pool, types } from "pg";

// pg devuelve los TIMESTAMP como '2026-05-13 10:30:00'; cambiamos
// el espacio por una T para que JS los parsee como fecha ISO.
types.setTypeParser(types.builtins.TIMESTAMP, (val) => val.replace(" ", "T"));

// pool: reutiliza conexiones a Postgres en vez de abrir una nueva por consulta
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;
