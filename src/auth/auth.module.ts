import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtConfigProvider } from "./jwt-config/jwt-config.provider";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (jwtConfigProvider: JwtConfigProvider) => {
        const jwtConfig = jwtConfigProvider.getConfig();
        return {
          secret: jwtConfig.secret,
          signOptions: { expiresIn: jwtConfig.expiresIn },
        };
      },
      inject: [JwtConfigProvider],
      extraProviders: [JwtConfigProvider],
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {
}
