const {Schema, model}= require('mongoose')

const menuItemSchema = new Schema({
  id:{
    type:String,
    required:[true]
  },
  name: {
    type: 
    String,required:[true]
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: {
    type: Number,
    required:[true]
  },
  category: {
    type: String,
    required:[true]
  },
  image: {
    type: String,
    required:[true]
  }
});

const OrderSchema = Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'usuario' 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  order: { 
    type: [menuItemSchema],
    required: true
  },
  status: { 
    type: String, 
    enum: ['pendiente', 'realizado'], 
    default: 'pendiente', 
    required: true 
  },
  totalCost: { 
    type: Number, 
    required: true 
  },
});

module.exports=model("Pedidos", OrderSchema)