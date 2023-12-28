import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request: Request) {
    return request.body;
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log('session id :: ', session.id);

    session.authenticated = true;
    return session;
  }
}
