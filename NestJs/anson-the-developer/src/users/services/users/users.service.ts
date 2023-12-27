import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { IUser, SerializedUser } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    { username: 'username1', password: 'password1' },
    { username: 'username2', password: 'password2' },
    { username: 'username3', password: 'password3' },
    { username: 'username4', password: 'password4' },
  ];

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);

    return user !== undefined && new SerializedUser(user);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }
}
