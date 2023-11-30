<script setup lang="ts">
defineProps<{
  image?: string;
  alt: string;
  altText: string;
}>();
</script>

<template>
  <div class="w-10 h-10 rounded relative">
    <img
      v-if="image"
      :src="image"
      :alt="alt"
      :aria-label="altText"
      class="absolute inset-0 object-cover rounded"
    />
    <div
      v-else
      class="w-10 h-10 rounded bg-gray-300 flex items-center justify-center"
    >
      {{ altText }}
    </div>
  </div>
</template>
