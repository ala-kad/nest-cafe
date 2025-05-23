import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

async create(createUserDto: CreateUserDto): Promise<User> {
  const { username, password, email } = createUserDto;

  const salt = await bcrypt.genSalt(); 
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = this.repository.create({
    username,
    email,
    password: hashedPassword,
  });

  return this.repository.save(user);
}
  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repository.remove(user);
  }
}
