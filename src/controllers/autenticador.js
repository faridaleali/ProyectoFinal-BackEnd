const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req=request, res=response) => {
  const {correo, password} = req.body;

  try {
    const usuario = await Usuario.findOne({correo});
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if(!usuario) {
      return res.status(400).json({
        msg: 'Correo o contraseña incorrecto'
      })
    }

    if(!usuario.estado) {
      return res.status(400).json({
        msg: 'Correo o contraseña incorrectos',
      })
    }

    
    if(!validPassword) {
      return res.status(400).json({
        msg: 'Correo o contraseña incorrecto',
      })
    }

    const token = await generarJWT(usuario.id);

    res.json({
      msg: 'Login OK',
      usuario,
      token
    })
  }

  catch( error ) {
    console.log(error);
    return res.status(500).json({
        msg: 'Hable con el administrador del sistema'
    })
  }
}

module.exports = {
  login
}