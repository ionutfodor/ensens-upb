import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";
import { GoogleOauthGuard } from "../guards/google-oauth.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {


  constructor(private authService: AuthService) {
  }

  @ApiTags('Authentication')
  @ApiOperation({ description: 'Starts the Google authentication process' })
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth(): Promise<any> {
  }

  @ApiTags('Authentication')
  @ApiOperation({ description: 'Redirects after the Google authentication process and offers JWT token if authentication successful' })
  @ApiResponse({ status: 200, description: 'Json response containing the newly created JWT token' })
  @ApiResponse({ status: 401, description: 'Unauthorized - if the user cancels the authentication process' })
  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleRedirectCallback(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user = req.user;
    const accessToken = await this.authService.signIn(user);

    return res.status(HttpStatus.OK).json({ accessToken });
  }
}