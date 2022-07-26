import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { CreateUserInput, LoginInput, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async findCurrentUser(context: Context) {
    return context.user;
  }

  async login(input: LoginInput, context: Context) {
    // Get the user by name
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

    // Set a non-httpOnly cookie to let frontend check for authentication
    context.res.cookie('dummyAccessToken', '123456', {
      maxAge: 3.154e10, // 1 year
      httpOnly: false,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: false,
    });

    // Return the jwt
    return token;
  }

  logout(context: Context) {
    context.res.clearCookie('accessToken');
    context.res.clearCookie('dummyAccessToken');

    return 'Successfully logged out.';
  }
}

export default UserService;
