import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../model/config-keys";

export const GoogleAuthenticationConfig = registerAs(
  ConfigKey.GoogleAuthentication, () => ({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleScope: process.env.GOOGLE_SCOPE.split(',')
      .map(scope => scope.trim()),
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  }),
);