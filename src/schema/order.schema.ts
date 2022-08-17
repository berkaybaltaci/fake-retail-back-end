import { getModelForClass, prop } from '@typegoose/typegoose';
import { GraphQLObjectType } from 'graphql';
import { Field, InputType, Int, InterfaceType, ObjectType } from 'type-graphql';

@InterfaceType()
export class ItemQuantityPair {
  @Field(() => String)
  itemId: string;

  @Field(() => String)
  quantity: string;
}

@InputType()
export class ItemQuantityPairInput {
  @Field(() => String)
  itemId: string;

  @Field(() => String)
  quantity: string;
}

@ObjectType()
export class Order {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  userId: string;

  @Field(() => String)
  @prop({ required: true })
  recipientName: string;

  @Field(() => String)
  @prop({ required: true })
  recipientLastName: string;

  @Field(() => String)
  @prop({ required: true })
  recipientAddress: string;

  @Field(() => String)
  @prop({ required: true })
  creditCardLastFourDigits: string;

  @Field(() => [ItemQuantityPair])
  @prop({ required: true })
  items: ItemQuantityPair[];
}

export const OrderModel = getModelForClass<typeof Order>(Order);

@InputType()
export class GetOrderByIdInput {
  @Field()
  _id: string;
}

@InputType()
export class GetOrdersByUserIdInput {
  @Field()
  userId: string;
}

@InputType()
export class CreateOrderInput {
  @Field()
  @prop({ required: true })
  recipientName: string;

  @Field()
  @prop({ required: true })
  recipientLastName: string;

  @Field()
  @prop({ required: true })
  recipientAddress: string;

  @Field()
  @prop({ required: true })
  creditCardLastFourDigits: string;

  @Field(() => [ItemQuantityPairInput])
  @prop({ required: true })
  items: ItemQuantityPairInput[];
}
