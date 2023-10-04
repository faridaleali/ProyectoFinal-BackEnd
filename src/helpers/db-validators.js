const Menu = require('../models/menu');
const Usuario = require('../models/usuario');
const Order= require('../models/pedidos');

const nombreMenuExiste = async (name) => {
    const existeNombre = await Menu.findOne( { name } )

    if(existeNombre) {
        throw new Error(`El menu ${name} ya existe`)
    }
}

const menuIdExiste = async (id) => {
    const existeMenu = await Menu.findById(id)

    if(!existeMenu) {
        throw new Error (`El id ${id} no existe`)
    }

}

const orderExiste = async(id) => {
    const existeOrder = await Order.findById(id)

    if(!existeOrder){
        throw new Error(`El id ${id} no corresponde a ningún pedido registrado`)
    }
}

const usuarioExiste = async(id) => {
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`)
    }
}

const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

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