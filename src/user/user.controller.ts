import { Controller, Get, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/user/entities/roles.enum';
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null; 
  }

  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(Role.Manager) 
  @Get('manager-data')
  @HttpCode(HttpStatus.OK)
  getAdminData(@Request() req) {
    return { message: `Welcome, manager ${req.user.username}! This is sensitive data.` };
  }

}
