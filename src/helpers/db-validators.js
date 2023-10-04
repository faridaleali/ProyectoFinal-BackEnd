const Menu = require('../models/menu');
const Usuario = require('../models/usuario');
const Order= require('../models/pedidos');

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

//validar si el usuario con el id pasado existe
const usuarioExiste = async(id) => {
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`)
    }
}

//Validar Rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

//Validar email
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos`);
    }
}

module.exports = {
    nombreMenuExiste,
    menuIdExiste,
    orderExiste,
    usuarioExiste,
    esRolValido,
    emailExiste
}