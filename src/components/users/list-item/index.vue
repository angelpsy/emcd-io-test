<script setup lang="ts">
import Card from "@/components/shared/card/index.vue";
import Avatar from "@/components/shared/avatar/index.vue";
import { type IUser } from "@/types/user";
const { item } = defineProps<{
  item: IUser;
}>();
</script>

<template>
  <Card :key="item.id" class="p-1">
    <div class="flex gap-2">
      <div class="w-[40px]">
        <Avatar
          :image="item.avatar"
          :alt="item.fullName"
          :altText="item.initials"
        />
      </div>
      <div class="relative top-[-0.25em]">
        <div>{{ item.fullName }}</div>
        <div class="text-gray-500 text-sm">
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
        </div>
      </div>
    </div>
  </Card>
</template>
