const {Router}=require('express');
const { check } = require('express-validator');
const { usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getOrders,getOrder,postOrder,putOrder,deleteOrder,}= require('../controllers/pedidos');

const router= Router();

// Aplica validarJWT a todas las rutas de pedidos
router.use(validarJWT);

// Obtener todos los pedidos
router.get('/', validarJWT, getOrders);

// Obtener un pedido por su ID
router.get('/:id', validarJWT, getOrder);

// crear un pedido
router.post('/',  [
  // check('user', 'El usuario es obligatorio').notEmpty().isMongoId(),
  // check('date', 'La fecha debe ser completada').notEmpty(),
  check('order', 'La orden es obligatoria').isLength({ min: 4, max: 40 }),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  // check('status', 'El estado de la orden es obligatorio').notEmpty(),
  // usuarioExiste,
  //  esRolValido,
  validarCampos,
], postOrder);

// modificar un pedido por su ID
router.put('/:id',[
  // check('user', 'El usuario es obligatorio').notEmpty().isMongoId(),
  // check('date', 'La fecha es obligatoria').notEmpty(),
  check('order', 'El menú es obligatorio').notEmpty().isLength({min:4,max:40}),
  check('status', 'El estado es obligatorio').notEmpty(),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  // usuarioExiste,
  // esRolValido,
  validarCampos,  
], 
putOrder, 
  );

  // borrar un pedido por su ID
router.delete('/:id',[
  usuarioExiste,
  /* esRolValido, */
  validarJWT,
],
deleteOrder,
);

module.exports= router;