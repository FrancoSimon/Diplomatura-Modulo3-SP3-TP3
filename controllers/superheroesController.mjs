
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

/*
import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";
*/



export async function mostrarDetalleHeroe(req, res) {
  try {
     
    const { id } = req.params;
    console.log('ID recibido:', id);
    const hero = await obtenerSuperHeroePorId(id);
    console.log('Hero obtenido:', hero);
console.log(hero)
       if (!hero) {
      return res.status(404).send("Superhéroe no encontrado");
      }

      res.render('detalleHeroe', { hero});
    } catch (error) {
      res.status(500).send({
      mensaje: "Error al obtener el detalle del superhéroe",
      error: error.message
    });
  }
};



//GET obtener todos los superheroes
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperHeroes();
	res.render('dashboard',{ heroes: superheroes }); //renderiza la vista dashboard.ejs/ heroes: variable vista, superheroes: datos servicio/modelo
  //const superheroesFormateados = renderizarListaSuperheroes(superheroes);
  //res.status(200).json(superheroesFormateados);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al obtener los superhéroes",
        error: error.message,
      });
  }
}


//Mostrar vista crear super heroe
export async function mostrarFormularioCrearSuperHeroe(req, res) {
    try {     
        res.render('addSuperhero');        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de creación', error: error.message });
    }    
} 


//POST para crear un superheroe
export async function agregarSuperheroeController(req, res) {
  try {
    
    const nuevoSuperheroe = req.body;
 
    const superheroeCreado = await crearSuperHeroes(nuevoSuperheroe);
   

    res.redirect('/api/heroes'); //redirigimos a la vista
    //const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
    //res.status(201).json(superheroeFormateado);
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al crear el superheroe",
        error: error.message,
      });
  }
}



// Mostar vista - editar superheroe 
export async function mostrarFormularioEditarSuperHeroe(req, res) {
    try {
        const { id } = req.params;

        const hero = await obtenerSuperHeroePorId(id);
        
        if (!hero) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para editar' });
        }

        res.render('editarHeroe', { hero });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al mostrar el formulario de edición', error: error.message });
    }
}


//PUT actualizar un superheroe por ID --agregado modificar
export async function editarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
     //pedir datos que vienen  del middleware
    const datosActualizados = req.body;
    
    const superheroeActualizado = await actualizarSuperHeroes(id, datosActualizados);
    //console.log(superheroeActualizado);

    if (!superheroeActualizado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    //res.redirect('/api/heroes?exito=editado');//agregado
    res.redirect('/api/heroes');

  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al actualizar el superhéroe",
        error: error.message,
      });
  }
}


//DELETE eliminar un superheroe por ID
export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperHeroesPorId(id);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }

    res.redirect('/api/heroes');
  } catch (error) {
    res
      .status(500)
      .send({
        mensaje: "Error al eliminar el superhéroe",
        error: error.message,
      });
  }
}

