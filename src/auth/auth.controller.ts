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
    const user = req.user;
    const accessToken = await this.authService.signIn(user);

    return res.status(HttpStatus.OK).json({ accessToken });
  }
}