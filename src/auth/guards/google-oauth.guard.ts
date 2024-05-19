import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   // @ts-expect-error
  //   const activate = (await super().canActivate(context)) as boolean;
  //   const request = context.switchToHttp().getRequest();
  //   // @ts-ignore
  //   await super().logIn(request);
  //   return activate;
  // }
}