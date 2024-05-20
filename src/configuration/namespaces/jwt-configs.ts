import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../model/config-keys";

export const JwtConfig = registerAs(
  ConfigKey.JWT, () => ({
    expiresIn: parseInt(process.env.JWT_VALIDITY, 10),
    secret: process.env.JWT_SECRET,
  }),
);