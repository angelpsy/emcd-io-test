import type { HttpClient } from '@/types/http-client';
import { type IUsersFilter } from "@/types/users-filter.d";

// it is enough for now, but in the future we need to add base interface
export class UsersRepositoryRandomUserMe {
  constructor(private httpClient: HttpClient) {}
  async getUsersByFilter(filter: IUsersFilter) {
    const response = await this.httpClient.get("/", {
      params: {
        page: filter.page,
        results: filter.perPage,
      },
    });
    return {
      data: response.data.results,
    };
  }
}
