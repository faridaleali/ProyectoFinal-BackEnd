const express = require("express");
const router = express.Router();
const productsSchema = require("../models/products")

// Crear nuevo producto
router.post("/productos", (req, res) => {
	res.send("Creaste un nuevo producto")

	const product = productsSchema(req.body)

	product
		.save()
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));
});

// Obtener todos los productos
router.get("/productos", (req, res) => {
	productsSchema
		.find()
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
			message: error
		}));
});

// Obtener 1 producto
router.get("/productos/:id", (req, res) => {
	const { id } = req.params;

	productsSchema
		.find(id)
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));
});

// Editar 1 producto
router.put("/productos/:id", (req, res) => {
	const { id } = req.params;
	const { nombre } = req.body;

	productsSchema
		.updateOne({ _id: id}, { $set: { nombre } })
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));
});

// Eliminar 1 producto
router.delete("/productos/:id", (req, res) => {
	const { id } = req.params;

	productsSchema
		.remove({ _id: id})
		.then( (data) => res.json(data) )
		.catch( (error) => res.json({
				message: error
		}));
});

module.exports = router;