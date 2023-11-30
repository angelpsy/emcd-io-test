<template>
  <div ref="rootEl">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  withDefaults,
  defineComponent,
} from "vue";
defineComponent({
  name: "Observer",
});
const props = withDefaults(
  defineProps<{
    root?: HTMLElement | null;
    rootMargin?: string;
    threshold?: number | number[];
  }>(),
  {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  },
);
const emit = defineEmits(["on-change", "on-visible", "not-supported"]);
const observer = ref<IntersectionObserver | null>(null);
const rootEl = ref<HTMLElement | null>(null);

const unobserve = () => {
  if (observer.value) {
    rootEl.value && observer.value.unobserve(rootEl.value);
  }
};

onMounted(() => {
  if ("IntersectionObserver" in window) {
    const options = {
      root: props.root,
      rootMargin: props.rootMargin,
      threshold: props.threshold,
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        emit("on-change", entry);
        entry.isIntersecting && emit("on-visible", entry);
      });
    }, options);

    rootEl.value && observer.value.observe(rootEl.value);
  } else {
    emit("not-supported");
  }
});

onBeforeUnmount(() => {
  unobserve();
  observer.value = null;
});
</script>
