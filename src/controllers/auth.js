const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req=request, res=response) => {
    const {correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({correo});

        //Verificar si el correo existe
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo o password ingresados no son correctos'
            })
        }

        //Verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El correo o password ingresados no son correctos| usuario inactivo',
            })
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'El correo o password ingresados no son correctos',
            })
        }

        //Generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login OK',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Pongase en contacto con el administrador del sistema'
        })
    }
}

module.exports = {
    login
}