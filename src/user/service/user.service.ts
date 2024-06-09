import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user";
import { Repository } from "typeorm";

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  async createNewUser(userData: Partial<User>): Promise<User> {
    console.debug(`Creating new user with email: ${userData.email}`);
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateExistingUser(userData: Partial<User>, user: User): Promise<User> {
    // For now, only update the name of the user, as the id is auto-generated and the e-mail is unique
    if (userData.name !== user.name) {
      console.debug(`Updating name for user with email: ${user.email}`);
      user.name = userData.name;
      return this.userRepository.save(user);
    }

    console.debug(`Data for user with email: ${user.email} is the same, no need for updating`);
    return user;
  }
}