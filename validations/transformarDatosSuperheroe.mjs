// actúa como puente entre los datos recibidos (desde formularios HTML o APIs)
// y los requisitos de validación de tu aplicación

import { obtenerSuperHeroePorId } from '../services/superheroesService.mjs';

// Función transformarStringAArray
function transformarStringAArray(campo) {
  if (typeof campo === 'string') {
    return campo
      .split(',') // divide el string en elementos usando la coma como separador
      .map(p => p.trim()) // elimina espacios alrededor de cada elemento
      .filter(p => p.length >= 3 && p.length <= 60); // Aplica validación de longitud
  }
  return Array.isArray(campo) ? campo : [];
}

export async function transformarDatosSuperheroe(req, res, next) {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        mensaje: 'Datos del superhéroe no proporcionados correctamente'
      });
    }

    const camposArray = ['poderes', 'aliados', 'enemigos', 'debilidad'];
    camposArray.forEach(campo => {
      req.body[campo] = transformarStringAArray(req.body[campo]);
    });
    
    
    // Para PUT desde formulario HTML
    if (req.method === 'PUT' && req.get('content-type')?.includes('application/x-www-form-urlencoded')) {
      const { id } = req.params;
      const original = await obtenerSuperHeroePorId(id);

      if (!original) {
        return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
      }

      // Combinar con datos originales para mantener campos no proporcionados
      req.body = {
        ...original.toObject(),
        ...req.body,
        poderes: req.body.poderes,
        debilidad: req.body.debilidad,
        aliados: req.body.aliados,
        enemigos: req.body.enemigos
      };
    }

    next();
  } catch (error) {
    console.error('Error en transformarDatosSuperheroe:', error);
    return res.status(500).json({
      mensaje: 'Error al procesar los datos del superhéroe',
      error: error.message
    });
  }
}
