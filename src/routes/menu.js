const { Router } = require("express");
const router = Router();

const productsSchema = require("../models/menu");
const { menuesGet, menuPost, menuPut, menuDelete } = require("../controllers/menu");

// Crear nuevo menu
router.get("/menu", menuesGet);
router.post("/menu", menuPost);
router.put("/menu/:id", menuPut);
router.delete("/menu/:id", menuDelete);



/*
router.post("/menu", (req, res) => {

	const product = productsSchema(req.body)

	product
		.save()
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));
});

// Obtener todos los menu
router.get("/menu", (req, res) => {
	productsSchema
		.find()
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
			message: error
		}));
});

// Obtener 1 menu
router.get("/menu/:id", (req, res) => {
    const { id } = req.params;

    productsSchema
        .findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Menu no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ error: "Error interno del servidor" }));
});


// Editar 1 menu
router.put("/menu/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, detail, price, active, offer, offerprice } = req.body;

        const updatedProduct = await productsSchema.updateOne(
            { _id: id },
            { $set: { name, detail, price, active, offer, offerprice } }
        );

        if (updatedProduct.nModified === 0) {
            return res.status(404).json({ error: "Menu no encontrado" });
        }

        res.json({ message: "Menu actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar 1 menu
router.delete("/menu/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productsSchema.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return res.status(404).json({ error: "Menu no encontrado" });
        }

        res.json({ message: "Menu eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});*/


module.exports = router;