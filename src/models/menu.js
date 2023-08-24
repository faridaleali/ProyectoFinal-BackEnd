const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    active: {
        type: Boolean,
        require: true
    },
    offer: {
        type: Boolean,
        require: true
    },
    offerprice: {
        type: Number,
        require: true
    },
    
})

module.exports = mongoose.model('Menu', productSchema) //Nombre que le vamos a pasar y el esquema