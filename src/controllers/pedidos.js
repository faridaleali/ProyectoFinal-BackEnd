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
const postOrder = async (req, res) => {
  try {
    const { order, totalCost, status } = req.body;
    const usuario = req.usuario;

    if (!Array.isArray(order)) {
      return res.status(400).json({ message: 'La orden debe ser un array de objetos.' });
    }

    const menuItems = order.map(menu => {
      const { name, quantity, id, price, category, image} = menu;
      return {  name, quantity, id, price, category, image};
    });

    // Si no se proporciona un estado, establecerlo en "pendiente"
    const orderStatus = status ? status.toLowerCase() : 'pendiente';

    // Crear un nuevo pedido con el usuario y la fecha automáticamente
    const newOrder = new Order({
      user: usuario._id,
      order: menuItems,
      totalCost,
      status: orderStatus,  // se usa el status proporcionado o 'Pendiente' si no se proporciona
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
  const { order, status, totalCost } = req.body;

  try {

  // Validar el ID del pedido
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: 'ID de pedido no válido' });
  }

  // Validar la estructura de data
  if (!order || !Array.isArray(order) || !status || !totalCost) {
  return res.status(400).json({ message: 'La estructura de data es incorrecta' });
  }

    // Datos a guardar
    let data = {
      order,
      status,
      totalCost,
      user: req.usuario._id,
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
