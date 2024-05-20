import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user";
import { UserService } from "./service/user.service";
import { PostgresConfigProvider } from "./database-config/postgres-config.provider";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (postgresConfigProvider: PostgresConfigProvider) => ({
        type: 'postgres',
        ...postgresConfigProvider.getConfig(),
        entities: [User],
        synchronize: false
      }),
      inject: [PostgresConfigProvider],
      extraProviders: [PostgresConfigProvider],
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UserService,
    PostgresConfigProvider
  ],
  exports: [UserService]
})
export class UserModule {
}
