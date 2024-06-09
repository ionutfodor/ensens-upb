import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { GoogleAuthenticationConfiguration } from "../../configuration/model/google-authentication-configuration";
import { ConfigKey } from "../../configuration/model/config-keys";
import { UserDetails } from "../model/user-details";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    ) {
    const googleAuthenticationConfiguration =
      configService.get<GoogleAuthenticationConfiguration>(ConfigKey.GoogleAuthentication);
    super({
      clientID: googleAuthenticationConfiguration.googleClientId,
      clientSecret: googleAuthenticationConfiguration.googleClientSecret,
      scope: [...googleAuthenticationConfiguration.googleScope],
      callbackURL: googleAuthenticationConfiguration.googleRedirectUri
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<UserDetails> {
    return new UserDetails({
      email: profile.emails[0].value,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
    });
  }
}