import type { IUsersFilter } from "@/types/users-filter";
import { ref } from "vue";

const DEFAULT_FILTER: IUsersFilter = {
  page: 1,
  perPage: 10,
};

export const useFilter = (defaultFilter: IUsersFilter = DEFAULT_FILTER) => {
  const filter = ref(defaultFilter);

  const updatePage = (page: number) => {
    filter.value = {
      ...filter.value,
      page,
    };
  };

  const increasePage = () => {
    updatePage(filter.value.page + 1);
  };

  return {
    filter,
    increasePage,
  };
};
