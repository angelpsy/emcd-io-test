<script setup lang="ts">
import { onMounted, inject } from "vue";
import UsersList from "@/components/users/list/index.vue";
import UsersListItem from "@/components/users/list-item/index.vue";
import Observer from "@/components/shared/observer/index.vue";
import { useUsers } from "@/composables/users";
import { useFilter } from "@/composables/filter";
import type { UsersService } from '@/services/users';

const userServiceInstance = inject<UsersService>('usersService');

const { users, isLoading, isLastPage, fetchUsersByFilter, loadMoreUsers } =
  useUsers(userServiceInstance);
const { filter, increasePage } = useFilter();

const fetchUsers = () => {
  fetchUsersByFilter(filter.value);
};

const loadMore = () => {
  increasePage();
  loadMoreUsers(filter.value);
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div>
    <UsersList v-if="users.length > 1" :users="users">
      <template #item="{ item }">
        <UsersListItem :item="item" />
      </template>
      <template #bottom>
        <!-- 220 = height of card (44) * 5 -->
        <Observer
          rootMargin="0px 0px 220px 0px"
          v-if="!isLastPage"
          v-show="!isLoading"
          @onVisible="loadMore"
        />
      </template>
    </UsersList>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>No data</div>
  </div>
</template>
