import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtConfiguration } from "../../configuration/model/jwt-configuration";
import { ConfigKey } from "../../configuration/model/config-keys";

@Injectable()
export class JwtConfigProvider {

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {
  }

  getConfig(): JwtConfiguration {
    const jwtConfiguration =
      this.configService.get<JwtConfiguration>(ConfigKey.JWT);
    return {
      secret: jwtConfiguration.secret,
      expiresIn: jwtConfiguration.expiresIn,
    };
  }
}