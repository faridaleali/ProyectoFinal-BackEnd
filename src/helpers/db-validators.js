const Menu = require('../models/menu');

//Validar nombre
const nombreMenuExiste = async (name) => {
    const existeNombre = await Menu.findOne( { name } )

    if(existeNombre) {
        throw new Error(`El menu ${name} ya existe`)
    }
}

//Validar si existe el menu
const menuIdExiste = async (id) => {
    const existeMenu = await Menu.findById(id)

    if(!existeMenu) {
        throw new Error (`El id ${id} no existe`)
    }

}

module.exports = {
    nombreMenuExiste,
    menuIdExiste
}