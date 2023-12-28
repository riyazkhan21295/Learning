import { Inject, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const userDB = await this.usersService.findUserByUsername(username);

    if (!userDB || !comparePassword(password, userDB.password)) {
      return null;
    }

    return new SerializedUser(userDB);
  }

  // async login(user: any) { }
}
