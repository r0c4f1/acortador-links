import { Pool } from 'pg';
import { DATABASE_URL } from "../enviroment"


export const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_CxzFGcBQ6T5m@ep-proud-credit-apyqvr80.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  }
});


pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL:', err);
  });

