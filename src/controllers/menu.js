const { request, response } = require('express');
const Menu = require('../models/menu');

const menuesGet = async (req = request, res = response) => {
    res.json({
        mensaje: "Menues de obtenido del sistema"
    })
}

const menuPost = async (req = request, res = response) => {
    const datos = req.body;
    const { name, detail, price, active, offer, offerprice } = datos;

    const productos = new Menu({ name, detail, price, active, offer, offerprice });

	productos
		.save()
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));

    res.json({
        mensaje: "Menu de agregado al sistema con exito"
    })
}

const menuPut = async (req = request, res = response) => {
    res.json({
        mensaje: "Menu de modificado del sistema con exito"
    })
}

const menuDelete = async (req = request, res = response) => {
    res.json({
        mensaje: "Menu de eliminado del sistema con exito"
    })
}

module.exports = {
    menuesGet,
    menuPost,
    menuPut,
    menuDelete
}