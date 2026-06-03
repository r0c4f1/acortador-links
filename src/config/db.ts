import { Pool } from 'pg';
import { DATABASE_URL } from "../enviroment"


export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});


pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL:', err);
  });

