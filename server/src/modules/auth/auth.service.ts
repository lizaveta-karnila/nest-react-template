import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'no user with this email was found'
      }, HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'wrong password'
      }, HttpStatus.UNAUTHORIZED);
    }
    
    const { password, id, ...res } = user;
    const payload = { ...res, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, pass: string, username?: string): Promise<number> {
    if (await this.usersService.checkUserEmail(email)) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'user already exist'
      }, HttpStatus.BAD_REQUEST);
    }
    pass = await bcrypt.hash(pass, 12);
    const user = await this.usersService.createUser(email, pass, username);
    return user.id;
  }
}
