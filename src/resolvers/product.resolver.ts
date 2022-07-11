import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { GetProductInput, Product } from '../schema/product.schema';
import ProductService from '../service/product.service';

@Resolver()
export default class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Query(() => [Product])
  products() {
    return this.productService.findProducts();
  }

  @Query(() => Product)
  product(@Arg('input') input: GetProductInput) {
    return this.productService.findSingleProduct(input);
  }
}
