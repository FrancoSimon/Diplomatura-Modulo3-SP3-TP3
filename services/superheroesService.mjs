//Tercero
/*logica de negocio - procesa la logica entre controlador y base de datos, utilizando los metodos 
del repositorio para recuperar, buscar, cear, eliminar super heroes*/

import SuperHeroeRepository from "../repositories/SuperHeroeRepository.mjs";

export async function obtenerSuperHeroePorId(id) {
    return await SuperHeroeRepository.obtenerPorId(id);
}


export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroeRepository.obtenerTodos();
}


export async function buscarSuperHeroePorAtributo(atributo, valor) {
    return await SuperHeroeRepository.buscarPorAtributo(atributo, valor);
}


export async function crearSuperHeroes(valor) {
    return await SuperHeroeRepository.crearHeroe(valor);
}


export async function actualizarSuperHeroes(id, valor) {
    return await SuperHeroeRepository.actualizarHeroe(id, valor);
}


export async function eliminarSuperHeroesPorId(id) {
    return await SuperHeroeRepository.eliminarHeroePorId(id);
}


export async function eliminarSuperHeroesPorNombre(nombre) {
    return await SuperHeroeRepository.eliminarHeroePorNombre(nombre);
}