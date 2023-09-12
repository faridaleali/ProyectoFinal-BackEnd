const {Router}=require('express');
const { check } = require('express-validator');
const { esRolValido, usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {pedidoGet, pedidosGet, pedidoPost, pedidoPut, pedidoDelete}= require('../controllers/pedidos');
const { esAdminRole } = require('../middlewares/validar-roles');

const router= Router();

router.get('/',validarJWT, pedidoGet, pedidosGet);

router.post('/',[
  check('user','El usuario es obligatorio').notEmpty().isMongoId(),
  check('date', 'La fecha debe ser completada').notEmpty(),
  check('order','La orden es obligatoria').isLength({min:4,max:40}),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  check('status','El estado de la orden es obligatorio').notEmpty(),
  validarCampos,
  esRolValido,
  usuarioExiste,
], 
  pedidoPost,

  );

router.put('/:id',[
  check('user', 'El usuario es obligatorio').notEmpty().isMongoId(),
  check('date', 'La fecha es obligatoria').notEmpty(),
  check('order', 'El menú es obligatorio').notEmpty().isLength({min:4,max:40}),
  check('status', 'El estado es obligatorio').notEmpty(),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  validarCampos,  
  esRolValido,
  usuarioExiste,
], 
  pedidoPut, 
  );

router.delete('/:id',[
  validarJWT,
  esRolValido,
  esAdminRole,
  usuarioExiste,
],
pedidoDelete,
);

module.exports= router;