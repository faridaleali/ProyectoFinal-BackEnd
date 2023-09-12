const {response, request} = require('express');
const Pedido = require('../models/pedidos')

// Get para obtener todos los Pedidos
const pedidosGet = async(req=request, res=response)=>{

  try {
    const { limite = 8, desde = 0 } = req.query;
    const query = { estado: 'pendiente' };
    const [total,pedidos]= await Promise.all([
      Pedido.countDocuments(query),
      Pedido.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("user")
        .populate("order","date","status","totalCost"),
    ]);
    res.json({
      mensaje:"Pedidos obtenidos",
      total,
      pedidos,
    })

  } catch (error) {
    console.error('Error al obterner los Pedidos', error);
    res.status(500).json({mensaje:'Hubo un error al obtener los Pedidos'});
  };

};

// Get para obtener un Pedido por ID
const pedidoGet = async(req=request, res=response)=>{
  const {id}= req.params;

  const pedido= await pedido.findById(id)
  .populate("user")
  .populate("order","date","status","totalCost");

  res.json({
    mensaje:"Pedido Obtenido",
    pedido
  })
}

const pedidoPost = async(req=request, res=response)=>{
  
}

const pedidoPut = async(req=request, res=response)=>{
  
}

const pedidoDelete = async(req=request, res=response)=>{
  
}

module.exports={
  pedidoGet,
  pedidosGet,
  pedidoPost,
  pedidoPut,
  pedidoDelete,
}