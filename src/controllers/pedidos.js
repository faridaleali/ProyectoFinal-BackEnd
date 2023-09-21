const { response, request } = require('express');
const Order = require('../models/pedidos');
const { generarJWT } = require('../helpers/generar-jwt');

// Obtener todos los pedidos
const getOrders = async (req = request, res = response) => {
  try {
    const { limit = 8, skip = 0 } = req.query;
    const query = { estado: 'pendiente' };
    const [total, orders] = await Promise.all([
      Order.countDocuments(query),
      Order.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .populate({
          path: 'order',
          select: 'date status totalCost',
        })
        .populate('user'),
    ]);
    res.json({
      message: 'Pedidos obtenidos',
      total,
      orders,
    });
  } catch (error) {
    console.error('Error al obtener los Pedidos', error);
    res.status(500).json({ message: 'Hubo un error al obtener los Pedidos' });
  }
};

// Obtener un pedido por ID
const getOrder = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const pedido = await Order.findById(id)
      .populate({
        path: 'order',
        select: 'date status totalCost',
      })
      .populate('user');
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json({
      message: 'Pedido obtenido',
      order: pedido,
    });
  } catch (error) {
    console.error('Error al obtener el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al obtener el Pedido' });
  }
};

// Crear un pedido
const postOrder = async (req = request, res = response) => {
  const { order, totalCost } = req.body;

  try {
    // Obtén el usuario del token (ya que el usuario está autenticado)
    const usuario = req.usuario;

    // Crea un nuevo pedido con el usuario y la fecha automáticamente
    const newOrder = new Order({
      user: usuario._id, // Asigna el ID del usuario
      order,
      totalCost,
    });

    // Guardar en la BD
    await newOrder.save();

    res.status(201).json({
      order: newOrder,
      message: 'Pedido creado',
    });
  } catch (error) {
    console.error('Error al crear el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al crear el Pedido' });
  }
};


// Modificar el pedido
const putOrder = async (req = request, res = response) => {
  const { id } = req.params;
  const { order, date, status, totalCost } = req.body;

  try {
    // Datos a guardar
    let data = {
      order,
      date,
      status,
      totalCost,
      user: req.user._id,
    };
    // Convertir el usuario a mayúsculas si se proporciona
    if (req.body.user) {
      data.user = req.body.user.toUpperCase();
    }
    // Encontrar y actualizar el pedido
    const pedido = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.status(201).json({
      order: pedido,
      message: 'El pedido se actualizó',
    });
  } catch (error) {
    console.error('Error al modificar el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al modificar el Pedido' });
  }
};

// Borrar el pedido (inactivar)
const deleteOrder = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.json({
      message: `El pedido ${deletedOrder.order} se inactivó`,
    });
  } catch (error) {
    console.error('Error al inactivar el Pedido', error);
    res.status(500).json({ message: 'Hubo un error al inactivar el Pedido' });
  }
};

module.exports = {
  getOrders,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder,
};