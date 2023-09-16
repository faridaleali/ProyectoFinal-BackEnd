const {Schema, model}= require('mongoose')

// Aqui se especifica que se pide para pedidos

const OrderSchema= Schema({
  user:{type: Schema.Types.ObjectId, ref:"usuario"},
  date: {type: Date,default: Date.now },
  order:{type:String, required:[true]},
  status: {type: String, enum: ['pendiente', 'realizado'], default: 'pendiente', required: true},
  totalCost:{type: Number, required:[true]}
})

// enum especifica que solo puede contener uno de los siguientes valores: 'pendiente' o 'realizado', viene de moongose
// La restricción enum es útil cuando deseas asegurarte de que los valores de un campo sean específicos y se ajusten a un conjunto limitado de opciones, lo que puede ayudar a mantener la integridad de los datos y prevenir entradas no válidas en tu base de datos.

module.exports=model("Order", OrderSchema)