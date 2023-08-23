const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Productos', productSchema) //Nombre que le vamos a pasar y el esquema