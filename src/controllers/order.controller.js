const OrderService = require("../services/order.service");
const { formatResponse } = require("../utils/formatting/formatting.utils");

const createOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Create a new order"
  /*
    #swagger.parameters['order'] = {
      in: 'body',
      type: 'object',
      required: true,
      schema: {
        items: [{ bookId: "663b6cdd5d7a42199aab9624", quantity: 2 }],
        totalAmount: 400,
        paymentMethod: "PAY_ON_DELIVERY || UPI || CARD",
        shippingAddress: {
          fullName: "John Doe",
          email: "john@example.com",
          phone: "9876543210",
          address: "123 Street",
          state: "MH"
        }
      }
    }
  */
  try {
    const payload = req.body;
    const result = await OrderService.createOrder(payload);
    return formatResponse(res, result);
  } catch (error) {
    return formatResponse(res, error);
  }
};

module.exports = { createOrder };