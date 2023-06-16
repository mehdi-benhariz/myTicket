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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
