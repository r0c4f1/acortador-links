import { nanoid } from 'nanoid';

export function esUrlValida(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function generarCodigoCorto(longitud: number = 6): string {
  return nanoid(longitud);
}
