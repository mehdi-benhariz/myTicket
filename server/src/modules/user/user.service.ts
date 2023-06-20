import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { GenericService } from 'src/commons/genericService.interface';
import {
  _handleOrderBy,
  _handlePagination,
  _handleSearch,
} from 'src/utils/service-helpers';
import { EntityManager, FindOneOptions } from 'typeorm';
import { UserAuthService } from './auth/user-auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements GenericService<User> {
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
    searchField?: keyof User,
    searchValue?: string,
    limit = 10,
    page = 1,
    orderBy?: keyof User,
  ): Promise<ProfileUserDto[]> {
    const query = this.entityManager.createQueryBuilder(User, 'user');

    _handleSearch<User>(query, searchField, searchValue, 'user');

    _handlePagination<User>(query, limit, page);

    _handleOrderBy<User>(query, orderBy, 'user');

    const users = await query.getMany();
    return users;
  }

  async findOne(id: number, relations: string[] = []): Promise<User> {
    const queryOptions: FindOneOptions<User> = {
      where: { id },
    };

    if (relations.length > 0) queryOptions.relations = relations;

    return this.entityManager.findOne(User, queryOptions);
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
