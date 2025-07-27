//Segundo
//el repositorio "repositories" se encarga de la comunicar el modelo con la base de datos
//aca creo interfaz CRUD

class IRepository {
    obtenerPorId(id)
    {
        throw new Error ("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos()
    {
        throw new Error ("Metodo 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo,valor)
    {
        throw new Error ("Metodo 'buscarPorAtributo()' no implementado");
    }
    crearHeroe(valor)
    {
        throw new Error ("Metodo 'crear()' no implementado");
    }
    actualizarHeroe(id, valor)
    {
        throw new Error ("Metodo 'actualizarHeroe()' no implementado");
    }
    eliminarHeroePorId(id)
    {
        throw new Error ("Metodo 'eliminarHeroePorId()' no implementado");
    }
    eliminarHeroePorNombre(nombre)
    {
        throw new Error ("Metodo 'eliminarHeroePorNombre()' no implementado");
    }
}

export default IRepository;