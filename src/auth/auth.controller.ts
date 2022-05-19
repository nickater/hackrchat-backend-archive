import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = body;
    return this.authService.register(user);
  }
}
