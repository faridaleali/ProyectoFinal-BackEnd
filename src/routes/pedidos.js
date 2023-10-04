const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getOrders, getOrder, postOrder, putOrder, deleteOrder, } = require('../controllers/pedidos');

const router = Router();

router.use(validarJWT);

router.get('/', validarJWT, getOrders);

router.get('/:id', validarJWT, getOrder);

router.post('/', [
  check('order', 'La orden es obligatoria').isLength({ min: 4, max: 40 }),
  check('totalCost', 'El Costo Total es obligatorio').isNumeric().notEmpty(),
  validarCampos,
], postOrder);

router.put('/:id', 
[
  check('id', 'El ID no existe').isMongoId(),
  check('status', 'El estado es obligatorio').notEmpty(),
  validarCampos,
], putOrder);

router.delete('/:id', [
  validarJWT,
],
  deleteOrder,
);

module.exports = router;