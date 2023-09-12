const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuarioPost, usuarioDelete } = require('../controllers/usuarios');
const { usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', usuariosGet);

router.post('/', 
    [
        check('nombre', "El nombre es obligatorio").notEmpty(),
        check('password', 'La contraseña debe tener un mínimo de 6 caracteres').isLength({min:6}),
        check('usuario').custom(usuarioExiste),
        validarCampos
    ],
    usuarioPost);

router.delete('/:id', 
    [
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
    ],
    usuarioDelete);

module.exports = router;