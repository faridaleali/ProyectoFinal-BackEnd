const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const getUsuarios = async (req = request, res = response) => {
    try {
        const usuarios = await Usuario.find().select('_id nombre correo rol direc estado');

        res.status(200).json({
            message: "Usuarios obtenidos exitosamente",
            totalUsuarios: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({
            message: "Error al obtener usuarios"
        });
    }
};


const postUsuario = async (req = request, res = response) => {
    try {
        const datos = req.body;
        const { nombre, correo, password, rol, direc } = datos;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const usuario = new Usuario({
            nombre,
            correo,
            password: hash,
            rol,
            direc
        });

        await usuario.save();

        usuario.password = undefined;

        res.status(201).json({
            usuario,
            mensaje: "Usuario creado correctamente",
        });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({
            mensaje: "Error al crear el usuario"
        });
    }
};

const putUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { nombre, correo, direc, password, rol, estado } = req.body;

        const data = {
            nombre,
            correo,
            rol,
            direc,
            estado
        };

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            data.password = hash;
        }

        const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });

        if (usuario) {
            usuario.password = undefined;
            res.status(200).json({
                mensaje: "Usuario actualizado",
                usuario,
            });
        } else {
            res.status(404).json({
                mensaje: "Usuario no encontrado",
            });
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({
            mensaje: "Error al actualizar el usuario",
        });
    }
};


const deleteUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const usuarioInactivado = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

        if (!usuarioInactivado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.status(200).json({
            mensaje: "Usuario desactivado y/o eliminado correctamente",
            usuarioInactivado,
        });
    } catch (error) {
        console.error("Error al eliminar/desactivar el usuario:", error);
        res.status(500).json({
            mensaje: "Error al eliminar/desactivar el usuario",
        });
    }
};


module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
}

