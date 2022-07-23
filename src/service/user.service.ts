import { ApolloError } from 'apollo-server';
import {
  CreateUserInput,
  GetUserByIdInput,
  LoginInput,
  UserModel,
} from '../schema/user.schema';
import Context from '../types/context';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async findCurrentUser(context: Context) {
    return context.user;
  }

  async login(input: LoginInput, context: Context) {
    // Get our user by name
    const user = await UserModel.findOne({ name: input.name }).lean();

    const e = 'Invalid name or password';

    if (!user) {
      throw new ApolloError(e);
    }
    // Validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    // Sign a jwt
    const token = signJwt(user);

    // Set a cookie for jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: false,
    });

    // Return the jwt
    return token;
  }
}

export default UserService;
