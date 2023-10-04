const { response, request } = require('express');
const Usuario = require('../models/usuario');
const Pedidos = require('../models/pedidos');
const Menu = require('../models/menu');

const coleccionesPermitidas = ['usuarios', 'pedidos', 'menu'];

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

const buscar = (req=request, res=response) => {
    const {coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
        });
    }

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