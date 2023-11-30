import {UsersRepositoryRandomUserMe} from "@/repositories/users/randomuser.me";
import {getHttpClientInstance} from "@/instances/httpClient/axios";

let instance: UsersRepositoryRandomUserMe | null = null;

export default function getUsersRepositoryRandomUserMeInstance() {
  if (!instance) {
    const httpClient = getHttpClientInstance();
    instance = new UsersRepositoryRandomUserMe(httpClient);
  }
  return instance;
}