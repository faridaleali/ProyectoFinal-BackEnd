const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuarioPost, usuarioPut, usuarioDelete } = require('../src/controllers/usuarios');
const { emailExiste, esRolValido, usuarioExiste } = require('../src/helpers/db-validators');
const { validarCampos } = require('../src/middlewares/validarCampos');
const { validarJWT } = require('../src/middlewares/validar-jwt');
const { esAdminRole } = require('../src/middlewares/validar-roles');

const router = Router();

router.get('/', usuariosGet);

router.post('/', 
    [
        check('nombre', "El nombre es obligatorio").notEmpty(),
        check('password', 'La contraseña debe tener un mínimo de 6 caracteres').isLength({min:6}),
        check('rol').custom(esRolValido),
        check('email').custom(emailExiste),
        validarCampos
    ],
    usuarioPost);

    router.put('/:id', 
    [
        validarJWT,
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(usuarioExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    usuarioPut);

router.delete('/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
    ],
    usuarioDelete);;

module.exports = router;