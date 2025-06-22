import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './dto/jwt-payload.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService, 
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password) {
      const isMatch = await bcrypt.compare(pass, user.password); 
      if (isMatch) {
        const { password, ...result } = user; 
        return result;
      }
    }
    return null; 
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id , role: user.role};
    return {
      access_token: this.jwtService.sign(payload), 
    };
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new UnauthorizedException('Username already exists'); 
    }
    return this.userService.create(createUserDto);
  }
}
