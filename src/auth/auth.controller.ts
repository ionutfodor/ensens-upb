import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { GoogleOauthGuard } from "./guards/google-oauth.guard";

@Controller('auth')
export class AuthController {


  constructor(private authService: AuthService) {
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth(): Promise<any> {
  }

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleRedirectCallback(@Req() req: Request, @Res() res: Response): Promise<any> {
    console.log("CALLBACK");
    console.log(req.user);
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 34560000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }
}