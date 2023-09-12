const Menu = require('../models/menu');
const Rol = require('../models/rol');
const Categoria =require ('../models/categoria')

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

//Validar el rol del usuario
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

//Validar si la categoria del menú  existe
const categoriaExiste = async (id) => {
    const existeCategoria = await Categoria.findById(id)

    if(!existeCategoria){
        throw new Error(`El id ${id} no corresponde a ninguna categoría registrada`);
    }
}


module.exports = {
    nombreMenuExiste,
    menuIdExiste,
    esRolValido,
    categoriaExiste
}