const { response, request } = require('express');

//Importar los modelos
const Usuario = require('../models/usuario');
const Pedidos = require('../models/pedidos');
const Menu = require('../models/menu');

//Definir las coleciones permitidas
const coleccionesPermitidas = ['usuarios', 'pedidos', 'menu'];

//Buscar usuarios
const buscarUsuarios = async (termino, res = response) => {
    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}],
    });

    res.json({
        msg: 'Usuarios encontrados',
        results: usuarios,
    })
}

//Buscar Categorias
const buscarPedidos = async (termino, res = response) => {
    const regex = new RegExp(termino, "i");

    const pedidos = await Pedidos.find({
      $or: [{nombre: regex}, {descripcion: regex}, {order: regex}, {status: regex} ],
      $and: [{estado: true}],
    });

    res.json({
        results: pedidos,
    })
}

//Buscar Cursos
const buscarMenu = async (termino, res = response) => {
    const regex = new RegExp(termino, "i");

    const menu = await Menu.find({
        $or: [{nombre: regex}, {descripcion: regex}],
        $and: [{estado: true}],
    });

    res.json({
        results: menu,
    })
}

//Funcion principal para las búsquedas
const buscar = (req=request, res=response) => {
    const {coleccion, termino } = req.params;

    //Validar la colección
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
        });
    }

    //En función de la colección, buscar por el termino
    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'pedidos':
            buscarPedidos(termino, res);
            break;
        case 'menu':
            buscarMenu(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Hubo un error al hacer la búsqueda',
            });
            break;
    }
}

module.exports = {
    buscar
}