const { request, response } = require('express');

const esAdminRole = ( req = request, res = response, next )  =>{
  if( !req.usuario ) {
    return res.status(500).json({
      msg: 'Se quiere validar el rol sin validar el token'
    });
  }

  const {rol, nombre} = req.usuario;

  if(rol !== "USER_ADMIN"){
    return res.status(401).json({
      msg: `${nombre} no es Administrador`
    });
  }

  next();
};

module.exports = {
  esAdminRole
}