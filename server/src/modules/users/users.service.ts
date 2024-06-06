import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async findOne(email?: string): Promise<UserEntity | undefined> {
    return email ? await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'username', 'email', 'password'],
    }) : undefined;
  }

  async checkUserEmail (email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser (email: string, pass: string, username?: string) {
    const user = new UserEntity();
    user.email = email;
    user.password = pass;
    user.username = username || 'user_' + uuidv4();

    const savedUser = await this.usersRepository.save(user);
    
    return savedUser;
  }
}
