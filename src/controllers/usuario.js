const {response, request} = require('express');
const Usuario = require('../src/models/usuario');

const bcrypt = require('bcryptjs');

//get

const getUsuarios = async (req=request, res=response) => {
    const datos = req.query;
    const query = {estado: true};

    const [ total, usuarios ] = await Promise.all([Usuario.countDocuments(query), Usuario.find(query)]);

    res.json({
        mensaje: "Usuarios obtenidos",
        total,
        usuarios,
    })
}

//post

const postUsuario = async (req=request, res=response) => {
    const datos = req.body;
    const { nombre, correo, password, rol } = datos;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    usuario.password = hash; 
     
    await usuario.save();    
    
    res.json({
        usuario,
        mensaje: "Usuario creado correctamente",
    })
}

//put

const putUsuario = async (req=request, res=response) => {
    
    const {id} = req.params
    
    const {password, correo, ...resto} = req.body

    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    resto.password = password;

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})

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

