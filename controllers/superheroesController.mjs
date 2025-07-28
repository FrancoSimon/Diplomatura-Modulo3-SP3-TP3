
//cuarto con quinto(views)
/*los controladores coordinan la logica y definen que responder segun lo que pida el cliente. 
El controlador actua como intermediario, gestionando las solicitudes del cliente y llama a la 
capa de servicios para realizar las operaciones necesarias.*/
//Utilizando las vistas para presentar los datoss

import {
  obtenerSuperHeroePorId,
  obtenerTodosLosSuperHeroes,
  buscarSuperHeroePorAtributo,
  crearSuperHeroes,
  actualizarSuperHeroes,
  eliminarSuperHeroesPorId,
  eliminarSuperHeroesPorNombre
} from "../services/superheroesService.mjs";

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

//import { validate } from '../validations/validationmiddleware.mjs';



//GET obtener un superheroe por ID 
export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);

    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }

    const superheroeFormateado = renderizarSuperheroe(superheroe);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener el superhéroe",
        error: error.message,
      });
  }
}

//GET obtener todos los superheroes
/*
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperHeroes();
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);
    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los superhéroes",
        error: error.message,
      });
  }
}
*/
// GET obtener todos los superheroes (ahora renderiza la vista) agregado
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        res.render('dashboard', { 
            title: 'Dashboard de Superheroes',
            superheroes 
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al obtener los superheroes',
            error
        });
    }
}
//GET obtener los superheroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperHeroePorAtributo(atributo, valor);

    if (superheroes.length === 0) {
      return res
        .status(404)
        .send({ mensaje: "No se encontraron superheroes con ese atributo" });
    }
    const superheroesFormateados = renderizarListaSuperheroes(superheroes);

    res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al buscar los superheroes",
        error: error.message,
      });
  }
}

//POST para crear un superheroe
/*
export async function crearSuperheroeController(req, res) {
  try {
    const nuevoSuperheroe = req.body;
    // // Limpiar los datos antes de guardarlos -- esta opcion es porque no me funciono en las validaciones. consultar!!!
    nuevoSuperheroe.nombreSuperheroe = nuevoSuperheroe.nombreSuperheroe?.trim();
    nuevoSuperheroe.nombreReal = nuevoSuperheroe.nombreReal?.trim();
    nuevoSuperheroe.poderes = nuevoSuperheroe.poderes?.map(poder => poder.trim());

    const superheroeCreado = await crearSuperHeroes(nuevoSuperheroe);
    
    const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
    res.status(201).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al crear el superheroe",
        error: error.message,
      });
  }
}
*/
//POST crear superheroe - agreagdo
export async function crearSuperheroeController(req, res) {
    try {
        const nuevoSuperheroe = req.body;
        
        // Procesar campos que vienen como strings separados por comas
        if (typeof nuevoSuperheroe.poderes === 'string') {
            nuevoSuperheroe.poderes = nuevoSuperheroe.poderes.split(',').map(p => p.trim());
        }
        if (typeof nuevoSuperheroe.debilidad === 'string') {
            nuevoSuperheroe.debilidad = nuevoSuperheroe.debilidad.split(',').map(d => d.trim());
        }
        
        const superheroeCreado = await crearSuperHeroes(nuevoSuperheroe);
        
        // Redirigir al dashboard después de crear
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al crear el superheroe',
            error
        });
    }
}

// Controlador para mostrar el formulario de edicion - agregado
export async function editarSuperheroeViewController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);

        if (!superheroe) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Superhéroe no encontrado'
            });
        }

        res.render('editSuperhero', {
            title: 'Editar Superhéroe',
            superheroe
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al cargar el superhéroe para edición',
            error
        });
    }
}

// Controlador para procesar la actualizacion - agreagado
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        
        // Procesar campos que vienen como strings separados por comas
        if (typeof datosActualizados.poderes === 'string') {
            datosActualizados.poderes = datosActualizados.poderes.split(',').map(p => p.trim());
        }
        if (typeof datosActualizados.debilidad === 'string') {
            datosActualizados.debilidad = datosActualizados.debilidad.split(',').map(d => d.trim());
        }
        
        const superheroeActualizado = await actualizarSuperHeroes(id, datosActualizados);
        
        if (!superheroeActualizado) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Superhéroe no encontrado'
            });
        }
        
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al actualizar el superhéroe',
            error
        });
    }
}
/*
//PUT actualizar un superheroe por ID
export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    
    const superheroeActualizado = await actualizarSuperHeroes(id, datosActualizados);
    //console.log(superheroeActualizado);
    if (!superheroeActualizado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al actualizar el superhéroe",
        error: error.message,
      });
  }
}
*/
//DELETE eliminar un superheroe por ID - agregado
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroeEliminado = await eliminarSuperHeroesPorId(id);
        
        if (!superheroeEliminado) {
            return res.status(404).render('error', {
                title: 'Error',
                message: 'Superhéroe no encontrado'
            });
        }
        
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error al eliminar el superhéroe',
            error
        });
    }
}

/*
//DELETE eliminar un superheroe por ID
export async function eliminarSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperHeroesPorId(id);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al eliminar el superhéroe",
        error: error.message,
      });
  }
}
*/
//DELETE eliminar un superheroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroeEliminado = await eliminarSuperHeroesPorNombre(nombre);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al eliminar el superhéroe",
        error: error.message,
      });
  }
}
