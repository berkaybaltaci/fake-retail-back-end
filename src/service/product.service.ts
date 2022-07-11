import { GetProductInput, ProductModel } from '../schema/product.schema';

class ProductService {
  async findProducts() {
    // If you want pagination, the logic should be here
    return ProductModel.find().lean();
  }

  async findSingleProduct(input: GetProductInput) {
    ProductModel.find();
    return ProductModel.findOne(input).lean();
  }
}

export default ProductService;
