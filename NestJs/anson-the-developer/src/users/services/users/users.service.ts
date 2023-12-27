import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { IUser, SerializedUser } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);

    return user !== undefined && new SerializedUser(user);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
