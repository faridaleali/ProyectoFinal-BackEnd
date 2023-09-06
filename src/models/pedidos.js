const {Schema, model}= require('mongoose')

// Aqui se especifica que se pide para pedidos

const PedidoSchema= Schema({
  user:{type: Schema.Types.ObjectId, ref:"usuario"},
  date: {type: Date, required:[true, 'La Fecha es obligatoria'],default: Date.now },
  order:{type: String, required:[true, 'La Orden es obligatoria']},
  status:{type: String, default: 'Pendiente'},
  totalCost:{type: Number, required:[true]}
})

module.exports=model("pedido", PedidoSchema)