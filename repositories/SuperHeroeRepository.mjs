//Implementa acceso real a mongoDB
import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroeRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }
  async crearHeroe (valor) {
    const nuevo = new SuperHero(valor);
    return await nuevo.save();
  }

  async actualizarHeroe (id, valor) {
    return await SuperHero.findByIdAndUpdate(id, valor, { new: true });
   
  }

  async eliminarHeroePorId(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  async eliminarHeroePorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperheroe: nombre });
  }
}


export default new SuperHeroeRepository;