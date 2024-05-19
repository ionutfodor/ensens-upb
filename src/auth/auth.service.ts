import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entity/user";
import { UserDetails } from "./model/user-details";

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async signIn(userDetails: UserDetails): Promise<string> {
    console.log(userDetails);
    if (!userDetails) {
      throw new BadRequestException('Unauthenticated');
    }

    let user = await this.userService.findUserByEmail(userDetails.email);

    if (!user) {
      user = await this.userService.createNewUser(user);
    } else {
      //TODO update user
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