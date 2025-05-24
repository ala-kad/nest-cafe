import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
<<<<<<< HEAD
=======
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
>>>>>>> 5f7f7da221b6dad8afa860f0252c23058fb82a7a

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

<<<<<<< HEAD
  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hash });
    return this.usersRepo.save(user);
=======
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
>>>>>>> 5f7f7da221b6dad8afa860f0252c23058fb82a7a
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
