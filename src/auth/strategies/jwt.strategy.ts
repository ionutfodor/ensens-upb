import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/service/user.service";
import { JwtConfiguration } from "../../configuration/model/jwt-configuration";
import { ConfigKey } from "../../configuration/model/config-keys";
import { JwtPayload } from "../model/jwt-payload";

Injectable();
export class JwtStrategy extends PassportStrategy(Strategy) {


  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(UserService) private readonly userService: UserService
  ) {
    const jwtConfiguration =
      configService.get<JwtConfiguration>(ConfigKey.JWT);
    super({
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayload) {
    return { userName: payload.sub, email: payload.email };
  }
}