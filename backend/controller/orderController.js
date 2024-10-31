import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";

const registerOrder = asyncHandler(async (req, res) => {
  const {
    orderItem,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const shippingAddressData = {
    address: `${shippingAddress.stateName} ${shippingAddress.city} ${shippingAddress.street}`,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
    emailAddress: shippingAddress.emailAddress,
    phone: shippingAddress.phone,
  };

  try {
    const order = new Order({
      orderItems: orderItem.map((x) => ({
        ...x,
        product: x.productId,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress: shippingAddressData,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();

    res.status(201).json(createOrder);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
const getOrders = asyncHandler(async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } else {
      const orders = await Order.find({ user: req.user._id });
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export { getOrderById, getOrders, registerOrder };
