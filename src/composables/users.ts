import { computed, ref } from "vue";
import { getUsersServiceClientInstance } from "@/instances/services/users/client";
import type { IUsersFilter } from "@/types/users-filter";
import type { IUser } from "@/types/user";

const DEFAULT_USERS = [] as IUser[];
const MAX_USERS = 100000;

export const useUsers = () => {
  const usersServiceInstance = getUsersServiceClientInstance();
  const users = ref<IUser[]>(DEFAULT_USERS);
  const isLoading = ref(false);

  const isLastPage = computed(() => {
    return users.value.length >= MAX_USERS;
  });

  const fetchUsersByFilter = async (filter: IUsersFilter) => {
    isLoading.value = true;
    const { data } = await usersServiceInstance.getUsersByFilter(filter);
    users.value = data;
    isLoading.value = false;
  };

  const loadMoreUsers = async (filter: IUsersFilter) => {
    if (isLastPage.value) return;
    isLoading.value = true;
    const { data } = await usersServiceInstance.getUsersByFilter(filter);
    users.value = [...users.value, ...data];
    isLoading.value = false;
  };

  return {
    users,
    isLoading,
    isLastPage,
    fetchUsersByFilter,
    loadMoreUsers,
  };
};
