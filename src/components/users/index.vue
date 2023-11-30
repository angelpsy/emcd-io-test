<script setup lang="ts">
import { onMounted } from 'vue';
import Observer from "@/components/shared/observer/index.vue";
import { useUsers } from "@/composables/users";
import { useFilter } from "@/composables/filter";

const { users, isLoading, isLastPage, fetchUsersByFilter, loadMoreUsers } =
  useUsers();
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
    <div v-if="users.length > 1">
      <div v-for="user in users" :key="user.id">
        {{ user.fullName }}
      </div>
      <Observer
        rootMargin="0px 0px 100px 0px"
        v-if="!isLastPage"
        v-show="!isLoading"
        @onVisible="loadMore"
      />
    </div>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>No data</div>
  </div>
</template>
