const { Router } = require("express");
const { check } = require('express-validator');
const { menuesGet, menuPost, menuPut, menuDelete } = require("../controllers/menu");
const { nombreMenuExiste, menuIdExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", menuesGet);

router.post("/",
[
    check('name', 'El nombre del menu es obligatorio').notEmpty(),
    check('name').custom(nombreMenuExiste),
    check('detail', 'La descripcion es obligatoria').notEmpty(),
    check('price', 'El precio es obligatorio').notEmpty(),
    check('category', '').notEmpty(),
    check('image', '').notEmpty(),
    validarCampos
], 
menuPost);


router.put("/:id", 
[
    check('id', 'El ID no existe').isMongoId(),
    check('id').custom(menuIdExiste),
    validarCampos
],
menuPut);


router.delete("/:id", 
[
    check('id', 'El ID no existe').isMongoId(),
    check('id').custom(menuIdExiste),
    validarCampos
],
menuDelete);


module.exports = router;

