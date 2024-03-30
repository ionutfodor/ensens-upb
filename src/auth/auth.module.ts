import { Module } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';

@Module({
  providers: [
    LoginService,
    LogoutService
  ]
})
export class AuthModule {}
