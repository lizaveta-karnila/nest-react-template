import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInRequestDto: SignInRequestDto) {
    return this.authService.signIn(signInRequestDto.email, signInRequestDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authService.register(registerRequestDto.email, registerRequestDto.password, registerRequestDto.username);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
