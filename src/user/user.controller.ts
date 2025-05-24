import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.userService.findByUsername(req.user.username);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }

  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.userService.create(body.username, body.password);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...result } = user;
    return result;
  }
}
