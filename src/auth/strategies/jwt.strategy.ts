import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/service/user.service";
import { JwtConfiguration } from "../../configuration/model/jwt-configuration";
import { ConfigKey } from "../../configuration/model/config-keys";
import { JwtPayload } from "../model/jwt-payload";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {


  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };


    const jwtConfiguration =
      configService.get<JwtConfiguration>(ConfigKey.JWT);

    super({
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.jwtSecret,
      jwtFromRequest: extractJwtFromCookie
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Unauthorized request! Please log-in to continue');
    }

    return payload;
  }
}