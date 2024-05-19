import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../model/config-keys";

export const JwtConfig = registerAs(
  ConfigKey.JWT, () => ({
    jwtValidity: parseInt(process.env.JWT_VALIDITY, 10),
    jwtSecret: process.env.JWT_SECRET,
  }),
);