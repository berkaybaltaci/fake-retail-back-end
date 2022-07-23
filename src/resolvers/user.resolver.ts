import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateUserInput,
  GetUserByIdInput,
  LoginInput,
  User,
} from '../schema/user.schema';
import UserService from '../service/user.service';
import Context from '../types/context';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) // returns the jwt
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  currentUser(@Ctx() context: Context) {
    return this.userService.findCurrentUser(context);
  }
}
