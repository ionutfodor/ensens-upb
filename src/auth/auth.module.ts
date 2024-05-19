import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    GoogleStrategy,
    AuthService,
    JwtService
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
