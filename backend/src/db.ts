import { Pool, types } from "pg";
// PostgreSQL devuelve los campos TIMESTAMP sin zona horaria como strings en formato "YYYY-MM-DD HH:mm:ss".
// Esto puede causar problemas al trabajar con fechas en JavaScript, ya que se interpretan como UTC.
// Para evitar confusiones, configuramos el parser de tipos de pg para que devuelva estos campos como strings sin modificar.
types.setTypeParser(types.builtins.TIMESTAMP, (val) => val.replace(" ", "T"));
// Creamos un pool de conexiones a PostgreSQL usando la URL de conexión definida en las variables de entorno.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
export default pool;