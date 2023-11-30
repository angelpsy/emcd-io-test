<script setup lang="ts">
import { type IUser } from "@/types/user";

const { users } = defineProps<{
  users: IUser[];
}>();
defineSlots<{
  item?: (props: { item: IUser }) => any;
  bottom?: () => any;
}>();
</script>

<template>
  <ul class="max-w-[400px]">
    <li v-for="item in users" :key="item.id" class="my-4">
      <slot :item="item" name="item" />
    </li>
  </ul>
  <slot name="bottom" />
</template>
