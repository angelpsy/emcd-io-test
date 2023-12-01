<script setup lang="ts">
import { provide } from "vue";
import Users from "@/components/users/index.vue";

import { getUsersServiceClientInstance } from "./instances/services/users/client";

const usersService = getUsersServiceClientInstance();

provide(/* key */ "usersService", /* value */ usersService);
</script>

<template>
  <main>
    <Users />
  </main>
</template>
