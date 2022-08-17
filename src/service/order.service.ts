import {
  CreateOrderInput,
  GetOrderByIdInput,
  OrderModel,
  GetOrdersByUserIdInput,
} from '../schema/order.schema';
import Context from '../types/context';

class OrderService {
  async findOrder(input: GetOrderByIdInput) {
    return OrderModel.findOne(input).lean();
  }

  async findOrdersByUserId(input: GetOrdersByUserIdInput) {
    return OrderModel.find(input).lean();
  }

  async createOrder(input: CreateOrderInput, context: Context) {
    return OrderModel.create({ ...input, userId: context.user?._id });
  }
}

export default OrderService;
