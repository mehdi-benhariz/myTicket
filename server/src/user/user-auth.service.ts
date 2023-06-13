import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { PassportLocalService } from 'passport-local';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // private readonly PassportLocalService: PassportLocalService,
  ) {}

  async register(user: CreateUserDto): Promise<any> {
    // Generate a hash of the user's password using Passport's password hashing
    const hashedPassword = await this.hashPassword(user.password);

    // Create a new user object with the hashed password
    const newUser: CreateUserDto = { ...user, password: hashedPassword };

    const createdUser = await this.userService.create(newUser);
    const payload = { email: createdUser.email, sub: createdUser.id };
    return { createdUser, accessToken: this.jwtService.sign(payload) };
  }
  hashPassword(password: any): Promise<string> {
    return hash(password, 10);
  }

  async login(user: LoginUserDto) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) throw new UnauthorizedException('Invalid credentials');
    const payload = { email: validatedUser.email, sub: validatedUser.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
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
  async logout(user: any) {
    return user;
  }
}
