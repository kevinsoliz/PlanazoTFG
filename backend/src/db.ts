import { Pool, types } from "pg";

types.setTypeParser(types.builtins.TIMESTAMP, (val) => val.replace(" ", "T"));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;