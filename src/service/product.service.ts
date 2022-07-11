import {
  GetPaginatedProductsInput,
  GetProductInput,
  ProductModel,
} from '../schema/product.schema';

class ProductService {
  async findProducts(
    input: GetPaginatedProductsInput = {
      numberOfProductsToGet: Infinity,
      numberOfProductsToSkip: 0,
    }
  ) {
    // If you want pagination, the logic should be here
    return ProductModel.find()
      .skip(input.numberOfProductsToSkip)
      .limit(input.numberOfProductsToGet)
      .lean();
  }

  async findSingleProduct(input: GetProductInput) {
    ProductModel.find();
    return ProductModel.findOne(input).lean();
  }
}

export default ProductService;
