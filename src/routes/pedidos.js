const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOrders, getOrder, postOrder, putOrder, deleteOrder, } = require('../controllers/pedidos');

const router = Router();

// Aplica validarJWT a todas las rutas de pedidos
router.use(validarJWT);

// Obtener todos los pedidos
router.get('/', validarJWT, getOrders);

// Obtener un pedido por su ID
router.get('/:id', validarJWT, getOrder);

// crear un pedido
router.post('/', [
  check('order', 'La orden es obligatoria').isLength({ min: 4, max: 40 }),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  validarCampos,
], postOrder);

// modificar un pedido por su ID
router.put('/:id', 
[
  check('id', 'El ID no existe').isMongoId(),
  check('status', 'El estado es obligatorio').notEmpty(),
  validarCampos,
], putOrder);


// borrar un pedido por su ID
router.delete('/:id', [
  validarJWT,
],
  deleteOrder,
);

module.exports = router;