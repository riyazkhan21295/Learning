import { Exclude } from 'class-transformer';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export class SerializedUser {
  username: string;
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
