import UserModel, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import randToken from 'rand-token';
import jwt from 'jsonwebtoken';
import { jwtSecretKey, saltRounds } from '../config/constants';
import { BadRequestError, InternalError, NotFoundError } from '../utils/ErrorHandler';
import { JwtPayload } from '../interface/jwt-payload';

class UserService {
  public static async create(data: IUser): Promise<IUser> {
    try {
      const userModel = new UserModel();
      userModel.firstName = data.firstName;
      userModel.email = data.email;
      userModel.lastName = data.lastName;
      userModel.password = data.password;
      userModel.jwtRefreshToken = data.jwtRefreshToken;
      userModel.role = data.role;

      const user = await userModel.save();

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public static async findOneBy(query: any): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne(query);
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public static async registerUser(data: IUser) {
    try {
      data.email = data.email.toLowerCase();

      let user = await this.findOneBy({ email: data.email });

      if (user) {
        throw new BadRequestError('User email is taken');
      }

      const harshedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = harshedPassword;

      data.jwtRefreshToken = randToken.uid(256);

      try {
        user = await this.create(data);
      } catch (error: any) {
        throw new InternalError(error.message);
      }
      // create access token and refresh token.
      const authUserObj = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        tokens: {
          jwtAccessToken: `${jwt.sign(
            {
              id: user._id,
              role: user.role,
            },
            jwtSecretKey as any,
            { expiresIn: 8640000 },
          )}`,
          jwtRefreshToken: user.jwtRefreshToken,
        },
      };
      return authUserObj;
    } catch (error) {
      throw error;
    }
  }
  public static async loginUser(data: IUser): Promise<any> {
    try {
      //
      data.email = data.email.toLowerCase();

      let user;
      try {
        user = await this.findOneBy({ email: data.email });
      } catch (error: any) {
        throw new InternalError(error.message);
      }

      if (!user) {
        throw new BadRequestError('User is not registered');
      }
      const isvalidPassowrd = await bcrypt.compare(user.password, data.password);
      if (isvalidPassowrd) {
        throw new BadRequestError('password is incorrect');
      }
      const authUserObj = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        tokens: {
          jwtAccessToken: `${jwt.sign(
            {
              id: user._id,
              role: user.role,
            },
            jwtSecretKey as any,
            { expiresIn: 8640000 },
          )}`,
          jwtRefreshToken: user.jwtRefreshToken,
        },
      };
      return authUserObj;
    } catch (error: any) {
      throw error;
    }
  }
  public static async getUser(payload: JwtPayload): Promise<IUser> {
    try {
      const user = await UserModel.findOne({ _id: payload.id }).select('-password');
      if (!user) {
        throw new NotFoundError('user not found');
      }
      return user;
    } catch (error: any) {
      throw error;
    }
  }
}

export default UserService;
