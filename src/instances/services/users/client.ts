import getUsersRepositoryRandomUserMeInstance from "@/instances/repositories/users/randomuser.me";
import { UsersService } from "@/services/users";
import { userMapperRadomUserMeToClient } from "@/mappers/users/randomuser-me-to-client";

let instance: UsersService | null = null;

export function getUsersServiceClientInstance() {
  if (!instance) {
    const usersRepository = getUsersRepositoryRandomUserMeInstance();
    instance = new UsersService(usersRepository, userMapperRadomUserMeToClient);
  }
  return instance;
}
