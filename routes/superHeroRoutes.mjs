//las rutas actuan como puerta de entrada al sistema
//para conectar rutas HTTP con funciones del controlador
/*define los endpoints y mapea cada uno de sus respectvios controlador,
permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible*/


import express from 'express';
import {
    obtenerTodosLosSuperheroesController,
    mostrarFormularioCrearSuperHeroe,
    agregarSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
    mostrarDetalleHeroe,
    mostrarFormularioEditarSuperHeroe
} from '../controllers/superheroesController.mjs';
import {superheroeValidations, nombreParamValidation,idParamValidation} from '../validations/superheroesValidations.mjs';
import { validate } from '../validations/validationmiddleware.mjs';
import {transformarDatosSuperheroe} from '../validations/transformarDatosSuperheroe.mjs';

const router = express.Router();

//router.get('/heroes/:id', obtenerSuperheroePorIdController);//ver mas superheroe
router.get('/heroes/nuevo', mostrarFormularioCrearSuperHeroe);//mostrar la vista crear - ruta fija antes
router.get('/heroes/:id', mostrarDetalleHeroe);//ruta dinámica después
//router.get('/heroes/:id', mostrarDetalleHeroe);

// mostar todos los superheroes
router.get('/heroes', obtenerTodosLosSuperheroesController);//listado de superheroes

//editar superheroe
router.get('/heroes/:id/editar', mostrarFormularioEditarSuperHeroe);//mostrar la vista editar - agregado
// editar - Primero transformar datos, Luego validar, editar heroe
router.put('/heroes/:id/editar', transformarDatosSuperheroe, [...idParamValidation, ...superheroeValidations], validate, editarSuperheroeController);

//agregar superheroe
router.post('/heroes/agregar', transformarDatosSuperheroe, superheroeValidations, validate, agregarSuperheroeController); //agregar superheroe

//borrar superheroe
router.delete('/heroes/:id', idParamValidation, validate, eliminarSuperheroeController);

export default router;