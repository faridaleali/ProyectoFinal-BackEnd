const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    detail: {
        type: String,
        required:[true, 'El detalle es obligatorio']
    },
    price: {
        type: Number,
        required:[true, 'El precio es obligatorio']
    },
    active: {
        type: Boolean,
        required: true
    },
    offer: {
        type: Boolean,
        required:[true, 'El estado de oferta es obligatorio']
    },
    offerprice: {
        type: Number,
        required:[true, 'El precio de oferta es obligatorio']
    },
    
})

module.exports = mongoose.model('Menu', productSchema)