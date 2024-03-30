import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CommonModule } from "./common/common.module";
import { StoreModule } from "./store/store.module";

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CommonModule,
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
