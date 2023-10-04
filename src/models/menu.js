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
    category: {
        type: String,
        required:[true, 'El estado de oferta es obligatorio']
    },
    image: {
        type: String,
        required:[true, 'El precio de oferta es obligatorio']
    },
    active: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Menues', productSchema)