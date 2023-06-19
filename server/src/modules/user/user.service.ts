import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserAuthService } from './auth/user-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    @Inject(forwardRef(() => UserAuthService))
    private readonly userAuthService: UserAuthService,
  ) {}

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.entityManager.findOneBy(User, { email });
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    if (
      await this.entityManager.findOneBy(User, { email: createUserDto.email })
    )
      throw new BadRequestException('User with that email already exists');
    createUserDto.password = await this.userAuthService.hashPassword(
      createUserDto.password,
    );
    const user = this.entityManager.create(User, createUserDto);
    return await this.entityManager.save(User, user);
  }

  async findAll(
    search?: (user: User) => boolean,
    limit = 10,
    page = 1,
    orderBy?: keyof User,
  ): Promise<ProfileUserDto[]> {
    const query = this.entityManager.createQueryBuilder(User, 'user');

    // Apply search criteria if provided
    if (search) query.where(search);
    //select the fields we want to return
    //TODO: change this to use the ProfileUserDto
    query.select(['user.email', 'user.username', 'user.role']);
    // Apply pagination
    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Apply sorting if orderBy parameter is provided
    if (orderBy) query.orderBy(`user.${orderBy}`);

    // Execute the query and return the result
    const users = await query.getMany();
    return users;
    // return plainToClass(ProfileUserDto, users);
  }

  async findOne(id: number): Promise<User> {
    return this.entityManager.findOne(User, { where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new Error(`User with ID ${id} not found`);

    Object.assign(user, updateUserDto);

    return this.entityManager.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) throw new Error(`User with ID ${id} not found`);

    await this.entityManager.remove(user);
  }
}
