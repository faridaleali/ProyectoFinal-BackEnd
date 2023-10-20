const { request, response } = require('express');
const Menu = require('../models/menu');

const menuesGet = async (req, res) => {
    try {
        const menues = await Menu.find().select('_id name detail price category image active');

        res.status(200).json({
            mensaje: "Menues obtenidos del sistema",
            total: menues.length,
            menues: menues
        });
    } catch (error) {
        console.error("Ocurrió un error:", error);
        res.status(500).json({ mensaje: "Error al obtener los menues" });
    }
}


const menuPost = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { name, detail, price, category, image, active } = datos;

        const productos = new Menu({ name, detail, price, category, image, active });
        const data = await productos.save();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            error: "Error al agregar el menú al sistema",
            message: error.message
        });
    }
}

const menuPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, detail, price, category, image, active } = req.body;

        const updatedData = {
            name,
            detail,
            price,
            category,
            image,
            active
        };

        const menu = await Menu.findByIdAndUpdate(id, updatedData, { new: true });

        if (!menu) {
            return res.status(404).json({ msg: "Menu no encontrado" });
        }

        res.status(200).json({
            menu,
            msg: "El menu se actualizó",
        });
    } catch (error) {
        console.error("Error al actualizar el menú:", error);
        res.status(500).json({ msg: "Error al actualizar el menú" });
    }
};

const menuDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                mensaje: "El menú no existe en el sistema"
            });
        }

        if (!menu.active) {
            return res.json({
                mensaje: "El menú ya está desactivado"
            });
        }

        const menuDesactivado = await Menu.findByIdAndUpdate(id, { active: false }, { new: true });

        res.json({
            mensaje: "Menú eliminado del sistema con éxito",
            menuDesactivado
        });
    } catch (error) {
        console.error("Error al eliminar el menú:", error);
        res.status(500).json({
            mensaje: "Error al eliminar el menú"
        });
    }
}

module.exports = {
    menuesGet,
    menuPost,
    menuPut,
    menuDelete
}