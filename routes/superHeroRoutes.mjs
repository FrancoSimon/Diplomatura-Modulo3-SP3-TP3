//las rutas actuan como puerta de entrada al sistema
//para conectar rutas HTTP con funciones del controlador
/*define los endpoints y mapea cada uno de sus respectvios controlador,
permitiendo que las solicitudes HTTP se manejen de forma estructurada y predecible*/


import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';
import {superheroeValidations, nombreParamValidation,idParamValidation} from '../validations/superheroesValidations.mjs';
import { validate } from '../validations/validationmiddleware.mjs';

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.post('/heroes', superheroeValidations, validate, crearSuperheroeController);
router.put('/heroes/id/:id', [...idParamValidation, ...superheroeValidations], validate,actualizarSuperheroeController);
router.delete('/heroes/id/:id', idParamValidation, validate, eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', nombreParamValidation, validate, eliminarSuperheroePorNombreController);

export default router;