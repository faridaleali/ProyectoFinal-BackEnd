const {Schema, model}= require('mongoose')
// define la estructura de cada objeto en el array order
const menuItemSchema = new Schema({
  id:{type:String,required:[true]},
  name: {type: String,required:[true]},
  quantity: { type: Number, required: true },
  price: {type: Number,required:[true]},
  category: {type: String,required:[true]},
  image: {type: String,required:[true]}
});
// Aqui se especifica que se pide para pedidos
const OrderSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'usuario' },
  date: { type: Date, default: Date.now },
  order: { type: [menuItemSchema], required: true }, // Usamos el esquema menuItemSchema para definir la estructura del array
  status: { type: String, enum: ['pendiente', 'realizado'], default: 'pendiente', required: true },
  totalCost: { type: Number, required: true },
});
// enum especifica que solo puede contener uno de los siguientes valores: 'pendiente' o 'realizado', viene de moongose
// La restricción enum es útil cuando deseas asegurarte de que los valores de un campo sean específicos y se ajusten a un conjunto limitado de opciones, lo que puede ayudar a mantener la integridad de los datos y prevenir entradas no válidas en tu base de datos.

module.exports=model("Pedidos", OrderSchema)