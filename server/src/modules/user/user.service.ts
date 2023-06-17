import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async findByEmail(email: string): Promise<User> | null {
    const user = await this.entityManager.findOneBy(User, { email });
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const user = this.entityManager.create(User, createUserDto);
    return this.entityManager.save(User, user);
  }

  async findAll(
    search?: (user: User) => boolean,
    limit = 10,
    page = 1,
    orderBy?: keyof User,
  ): Promise<User[]> {
    const query = this.entityManager.createQueryBuilder(User, 'user');

    // Apply search criteria if provided
    if (search) {
      query.where(search);
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    // Apply sorting if orderBy parameter is provided
    if (orderBy) query.orderBy(`user.${orderBy}`);

    // Execute the query and return the result
    return query.getMany();
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
