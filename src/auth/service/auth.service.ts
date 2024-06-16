import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDetails } from "../model/user-details";
import { User } from "../../user/entity/user";

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async signIn(userDetails: UserDetails): Promise<string> {
    if (!userDetails) {
      throw new BadRequestException('Unauthenticated');
    }

    let user = await this.userService.findUserByEmail(userDetails.email);

    if (!user) {
      user = await this.userService.createNewUser(userDetails as User);
    } else {
      user = await this.userService.updateExistingUser(userDetails as User, user);
    }

    return this.generateJwt({
      sub: user.name,
      email: user.email
    });
  }

  private generateJwt(payload: any): string {
    return this.jwtService.sign(payload);
  }
}