import { Inject, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const userDB = await this.usersService.findUserByUsername(username);

    if (!userDB || userDB.password !== password) {
      return null;
    }

    return new SerializedUser(userDB);
  }

  // async login(user: any) { }
}
