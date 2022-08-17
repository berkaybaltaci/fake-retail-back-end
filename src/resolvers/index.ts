import OrderResolver from './order.resolver';
import ProductResolver from './product.resolver';
import UserResolver from './user.resolver';

export const resolvers = [
  ProductResolver,
  UserResolver,
  OrderResolver,
] as const;
