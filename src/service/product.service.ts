import {
  GetPaginatedProductsInput,
  GetProductByIdInput,
  GetProductByNameInput,
  ProductModel,
} from '../schema/product.schema';

class ProductService {
  async findProducts(
    input: GetPaginatedProductsInput = {
      numberOfProductsToGet: Infinity,
      numberOfProductsToSkip: 0,
    }
  ) {
    return ProductModel.find()
      .skip(input.numberOfProductsToSkip)
      .limit(input.numberOfProductsToGet)
      .lean();
  }

  async findSingleProduct(input: GetProductByIdInput) {
    return ProductModel.findOne(input).lean();
  }

  async findProductByName(input: GetProductByNameInput) {
    return ProductModel.findOne(input).lean();
  }
}

export default ProductService;
