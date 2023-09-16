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

// validar si el pedido existe
const orderExiste = async(id) => {
    const existeOrder = await Order.findById(id)

    if(!existeOrder){
        throw new Error(`El id ${id} no corresponde a ningún pedido registrado`)
    }
}

module.exports = {
    nombreMenuExiste,
    menuIdExiste,
    orderExiste
}