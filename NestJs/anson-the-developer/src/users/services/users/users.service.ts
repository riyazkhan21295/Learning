import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { IUser, SerializedUser } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
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

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: encodePassword(createUserDto.password),
    });

    const savedUser = await this.userRepository.save(newUser);

    return new SerializedUser(savedUser);
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
