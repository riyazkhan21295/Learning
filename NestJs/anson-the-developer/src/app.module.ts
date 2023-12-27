import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities from './typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@1.B2.c3.',
      database: 'anson_the_developer',
      entities: entities,
      synchronize: true, // shouldn't be used in production
    }),
    AuthModule,
    CustomersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
