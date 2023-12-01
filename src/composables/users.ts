import { computed, ref } from "vue";
import type { IUsersFilter } from "@/types/users-filter";
import type { IUser } from "@/types/user";
import type { UsersService } from '@/services/users';

const DEFAULT_USERS = [] as IUser[];
const MAX_USERS = 100000;

export const useUsers = (usersServiceInstance?: UsersService) => {
  const users = ref<IUser[]>(DEFAULT_USERS);
  const isLoading = ref(false);

  const isLastPage = computed(() => {
    return users.value.length >= MAX_USERS;
  });

  const fetchUsersByFilter = async (filter: IUsersFilter) => {
    if (!usersServiceInstance) return;
    isLoading.value = true;
    const { data } = await usersServiceInstance.getUsersByFilter(filter);
    users.value = data;
    isLoading.value = false;
  };

  const loadMoreUsers = async (filter: IUsersFilter) => {
    if (isLastPage.value || !usersServiceInstance) return;
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
