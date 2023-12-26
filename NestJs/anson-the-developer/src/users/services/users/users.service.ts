import { Injectable } from '@nestjs/common';
import { IUser, SerializedUser } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    { username: 'username1', password: 'password1' },
    { username: 'username2', password: 'password2' },
    { username: 'username3', password: 'password3' },
    { username: 'username4', password: 'password4' },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);

    return user !== undefined && new SerializedUser(user);
  }
}
