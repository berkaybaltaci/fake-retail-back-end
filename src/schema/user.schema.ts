import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import bcrypt from 'bcrypt';

@pre<User>('save', async function () {
  // Check that the password is being modified
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
})
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User>(User);

@InputType()
export class GetUserByIdInput {
  @Field()
  _id: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;
}
