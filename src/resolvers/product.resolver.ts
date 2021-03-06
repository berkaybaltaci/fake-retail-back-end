import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  GetProductByIdInput,
  Product,
  GetPaginatedProductsInput,
  GetProductByNameInput,
} from '../schema/product.schema';
import ProductService from '../service/product.service';

@Resolver()
export default class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Query(() => [Product])
  products(@Arg('input', { nullable: true }) input: GetPaginatedProductsInput) {
    return this.productService.findProducts(input);
  }

  @Query(() => Product)
  product(@Arg('input') input: GetProductByIdInput) {
    return this.productService.findSingleProduct(input);
  }

  @Query(() => Product)
  productByName(@Arg('input') input: GetProductByNameInput) {
    return this.productService.findProductByName(input);
  }
}
