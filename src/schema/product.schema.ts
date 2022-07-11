import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { IsNumber, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  product: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: string;

  @Field(() => String)
  @prop({ required: true })
  imagePath: string;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class GetProductInput {
  @Field()
  _id: string;
}

@InputType()
export class GetPaginatedProductsInput {
  @Field()
  numberOfProductsToGet: number;

  @Field()
  numberOfProductsToSkip: number;
}
