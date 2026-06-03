import { Pool } from 'pg';
import { DATABASE_URL } from "../enviroment"


export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: true
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL:', err);
  process.exit(-1);
});
