import { Request, Response } from 'express';
import { esUrlValida, generarCodigoCorto } from '../utils/url.utils';
import {
  crearEnlace as crearEnlaceModel,
  buscarPorCodigo,
  incrementarClicks,
  listarEnlaces,
} from '../models/link.model';

export async function crearEnlaceHandler(req: Request, res: Response): Promise<void> {
  try {
    const { url } = req.body;

    if (!url || !esUrlValida(url)) {
      res.status(400).json({ error: 'Por favor, proporciona una URL válida (http/https).' });
      return;
    }

    const codigo = generarCodigoCorto();
    const enlace = await crearEnlaceModel(url, codigo);

    res.status(201).json({
      id: enlace.id,
      url_original: enlace.url_original,
      codigo_corto: enlace.codigo_corto,
      url_corta: `${req.protocol}://${req.get('host') as string}/${enlace.codigo_corto}`,
      clicks: enlace.clicks,
      creado_en: enlace.creado_en,
    });
  } catch (error) {
    console.error('Error al crear enlace:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

export async function redireccionarHandler(req: Request, res: Response): Promise<void> {
  try {
    const codigo = req.params.codigo as string;
    const enlace = await buscarPorCodigo(codigo);

    if (!enlace) {
      res.status(404).json({ error: 'Enlace no encontrado.' });
      return;
    }

    await incrementarClicks(enlace.id);
    res.redirect(301, enlace.url_original);
  } catch (error) {
    console.error('Error al redireccionar:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

export async function listarHistorialHandler(_req: Request, res: Response): Promise<void> {
  try {
    const enlaces = await listarEnlaces();
    res.json(enlaces);
  } catch (error) {
    console.error('Error al listar historial:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
