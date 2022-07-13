import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { IsNumber, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  price: string;

  @Field(() => String)
  @prop({ required: true })
  imagePath: string;

  @Field(() => Boolean)
  @prop({ required: true })
  isNew: boolean;

  @Field(() => Boolean)
  @prop({ required: true })
  isVerified: boolean;

  @Field(() => Boolean)
  @prop({ required: true })
  isReducedPrice: boolean;

  @Field(() => Boolean)
  @prop({ required: true })
  isLocalOffer: boolean;

  @Field(() => Boolean)
  @prop({ required: true })
  isLimited: boolean;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class GetProductByIdInput {
  @Field()
  _id: string;
}

@InputType()
export class GetProductByNameInput {
  @Field()
  name: string;
}

@InputType()
export class GetPaginatedProductsInput {
  @Field()
  numberOfProductsToGet: number;

  @Field()
  numberOfProductsToSkip: number;
}
