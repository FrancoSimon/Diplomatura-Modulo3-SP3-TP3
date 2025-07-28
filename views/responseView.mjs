//quinto
//las vistas sirven para formatear o transformar los datos antes de enviarlo al cliente,
//JSON - es muy util para separar las presentaciones de dato

export function renderizarSuperheroe(superheroe) {
    return {
        Nombre: superheroe.nombreSuperheroe,
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta de Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos,
        "Subido Por": superheroe.subidoPor
    };
}

export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}