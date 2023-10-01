const { request, response } = require('express');
const Menu = require('../models/menu');

const menuesGet = async (req = request, res = response) => {
    const datos = req.query
    const query = { active: true }

    const [ total, menues ] = await Promise.all([
        Menu.countDocuments(query),
        Menu.find(query).select('_id name detail price category image active') 
    ])

    res.json({
        mensaje: "Menues de obtenido del sistema",
        total,
        menues
    })
}

const menuPost = async (req = request, res = response) => {
    const datos = req.body;
    const { name, detail, price, category, image, active } = datos;

    const productos = new Menu({ name, detail, price, category, image, active });

    try {
        const data = await productos.save();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({
            error: "Error al agregar el menú al sistema",
            message: error.message
        });
    }
}

const menuPut = async (req = request, res = response) => {

    // Agarro el ID
    const { id } = req.params

    // Obtengo los valores a modificar
    const { name, detail, price, category, image } = req.body

    // Modifico los valores
    /* No tengo nada*/

    // Busco el usuario y actualizo
    const menu = await Menu.findByIdAndUpdate(id, name, detail, price, category, image, {active: true}, { new: true } )


    res.json({
        mensaje: "Menu de modificado del sistema con exito",
        menu
    })
}

const menuDelete = async (req = request, res = response) => {

    // Agarro el ID
    const { id } = req.params;

    // Eliminar de la base de datos

    /* 
    
    No vamos a usar este metodo
    const menu = await Menu.findByIdAndDelete(id);
    
    */

    // Cambiar a estado false

    const menu = await Menu.findById(id)

    if(!menu.active) {
        return res.json({
            mensaje: "El menu no existe en el sistema"
        })
    }

    const menuDesactivado = await Menu.findByIdAndUpdate(id, { active: false }, { new: true } )

    res.json({
        mensaje: "Menu de eliminado del sistema con exito",
        menuDesactivado
    })
}

module.exports = {
    menuesGet,
    menuPost,
    menuPut,
    menuDelete
}