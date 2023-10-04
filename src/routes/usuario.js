const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { emailExiste, esRolValido, usuarioExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', getUsuarios);

router.post('/', 
    [
        check('nombre', "El nombre es obligatorio").notEmpty(),
        check('password', 'La contraseña debe tener un mínimo de 6 caracteres').isLength({min:6}),
        check('rol').custom(esRolValido),
        check('email').custom(emailExiste),
        check('direc', 'La direccion es obligatoria').notEmpty(),
        validarCampos
    ],
    postUsuario);

router.put('/:id', 
    [
        validarJWT,
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(usuarioExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    putUsuario);

router.delete('/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id', "No es un ID válido").isMongoId(),
        check('id').custom(usuarioExiste),
        validarCampos
    ],
    deleteUsuario);;

module.exports = router;