const {response, request} = require('express');
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');

const getUsuarios = async (req=request, res=response) => {
    const datos = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query), 
        Usuario.find(query).select('_id nombre correo password rol direc estado') 
    ]);

    res.json({
        mensaje: "Usuarios obtenidos",
        total,
        usuarios,
    })
}

const postUsuario = async (req=request, res=response) => {
    const datos = req.body;
    const { nombre, correo, password, rol, direc } = datos;
    const usuario = new Usuario({ nombre, correo, password, rol, direc });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    usuario.password = hash; 
     
    await usuario.save();    
    
    res.json({
        usuario,
        mensaje: "Usuario creado correctamente",
    })
}

const putUsuario = async ( req=request, res=response ) => {
    
    // Agarro el ID
    const { id } = req.params
    
    // Obtengo los valores a modificar
    const { nombre, correo, direc, password, rol, estado } = req.body

    let data = {
        nombre,
        correo,
        password,
        rol,
        direc,
        estado
    }

    /*if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    resto.password = password;*/

    const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})

    res.json({
        mensaje: "Usuario actualizado",
        usuario,
    })
}

//delete

const deleteUsuario = async (req=request, res=response) => {
    const {id} = req.params;
    
    const usuarioBorrado = await Usuario.findByIdAndDelete(id)

    const usuarioInactivado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        mensaje: "Usuario borrado",
        usuarioBorrado,
        usuarioInactivado,
    })
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
}

