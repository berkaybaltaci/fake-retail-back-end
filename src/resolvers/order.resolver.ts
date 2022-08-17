import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateOrderInput,
  GetOrderByIdInput,
  GetOrdersByUserIdInput,
  Order,
} from '../schema/order.schema';
import OrderService from '../service/order.service';
import Context from '../types/context';

@Resolver()
export default class OrderResolver {
  constructor(private orderService: OrderService) {
    this.orderService = new OrderService();
  }

  @Authorized()
  @Mutation(() => Order)
  createOrder(@Arg('input') input: CreateOrderInput, @Ctx() context: Context) {
    return this.orderService.createOrder(input, context);
  }

  @Query(() => Order)
  order(@Arg('input') input: GetOrderByIdInput) {
    return this.orderService.findOrder(input);
  }

  @Query(() => [Order])
  ordersByUserId(@Arg('input') input: GetOrdersByUserIdInput) {
    return this.orderService.findOrdersByUserId(input);
  }
}
