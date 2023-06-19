import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterUserDto): Promise<any> {
    // Generate a hash of the user's password using Passport's password hashing
    const hashedPassword = await this.hashPassword(user.password);

    // Create a new user object with the hashed password
    const newUser: RegisterUserDto = { ...user, password: hashedPassword };

    const createdUser = await this.userService.create(newUser as CreateUserDto);
    const payload = { email: createdUser.email, sub: createdUser.id };
    return { createdUser, accessToken: this.jwtService.sign(payload) };
  }

  async login(user: LoginUserDto) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) throw new UnauthorizedException('Invalid credentials');
    const payload = { email: validatedUser.email, sub: validatedUser.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  // LOGOUT
  async logout(req: Request, res: Response) {
    res.clearCookie('access_token');
    return 'logged out';
  }
  async hashPassword(password: any): Promise<string> {
    return await hash(password, 10);
  }
  async validateUser(email: string, password: string): Promise<User> | null {
    // Get the user with the given email
    const user = await this.userService.findByEmail(email);
    console.log(user);
    // If no user was found, return null (invalid credentials)
    if (!user) return null;

    // Check if the given password matches the hash stored in the database
    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    // If the password is invalid, return null
    if (!isPasswordValid) return null;

    // If the password is valid, return the user object
    return user;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
  }

  // *GET USER BY COOKIE
  async validateUserByCookie(data: any) {
    if (!data) throw new UnauthorizedException();
    let user;

    try {
      const payload = await this.jwtService.verifyAsync(data, {
        secret: 'sussybaka',
      });
      const user = await this.userService.findByEmail(payload['email']);
      if (!user) throw new UnauthorizedException('User not found');
    } catch {
      throw new UnauthorizedException();
    }
    return user;
  }
}
