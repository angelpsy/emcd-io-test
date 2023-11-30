import { userMapperRadomUserMeToClient } from "../../mappers/users/randomuser-me-to-client";
import { UsersRepositoryRandomUserMe } from "@/repositories/users/randomuser.me";
import { type IUsersFilter } from "@/types/users-filter.d";

// it is enough for now, but in the future we need to add base interface
export class UsersService {
  constructor(
    private usersRepository: UsersRepositoryRandomUserMe,
    private userMapper?: typeof userMapperRadomUserMeToClient,
  ) {}
  async getUsersByFilter(filter: IUsersFilter) {
    const { data: users, ...rest } =
      await this.usersRepository.getUsersByFilter(filter);
    return {
      data: this.userMapper ? users.map(this.userMapper) : users,
      ...rest,
    };
  }
}
