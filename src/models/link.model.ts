import { pool } from '../config/db';

export interface Enlace {
  id: number;
  url_original: string;
  codigo_corto: string;
  clicks: number;
  creado_en: Date;
}

export async function crearEnlace(
  urlOriginal: string,
  codigoCorto: string
): Promise<Enlace> {
  const result = await pool.query(
    `INSERT INTO enlaces (url_original, codigo_corto)
     VALUES ($1, $2)
     RETURNING *`,
    [urlOriginal, codigoCorto]
  );
  return result.rows[0];
}

export async function buscarPorCodigo(
  codigo: string
): Promise<Enlace | null> {
  const result = await pool.query(
    'SELECT * FROM enlaces WHERE codigo_corto = $1',
    [codigo]
  );
  return result.rows[0] || null;
}

export async function incrementarClicks(id: number): Promise<void> {
  await pool.query(
    'UPDATE enlaces SET clicks = clicks + 1 WHERE id = $1',
    [id]
  );
}

export async function listarEnlaces(): Promise<Enlace[]> {
  const result = await pool.query(
    'SELECT * FROM enlaces ORDER BY created_at DESC'
  );
  return result.rows;
}
