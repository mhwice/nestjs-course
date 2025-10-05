import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-users-param.dto";
import { AuthService } from "src/auth/providers/auth.service";

/**
 * Class to connect to Users table and perform business operations
*/
@Injectable()
export class UsersService {
  constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

  /**
   * The method to get all of the users from the database
  */
  public findAll(getUserParamDto: GetUsersParamDto, limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log({ isAuth });

    return [
      { firstName: "John", email: "john@doe.com" },
      { firstName: "Alice", email: "alice@doe.com" }
    ];
  }

  /**
   * Finding a single user by the id of the user
  */
  public findOneById(id: string) {
    return { id: 123, firstName: "Alice", email: "alice@doe.com" };
  }
}
