<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="text-9.5 leading-none tracking-.6px text-opacity-85 select-none font-900 my-4">
    <span class="mx-1 my-2 inline-block relative after:-bottom-2 after:left-1/10 after:w-6/10 after:h-7 after:content-empty after:absolute after:inline-block after:rounded-[6px_12px_20px_14px] after:bg-opacity-30 after:bg-opacity-30 after:bg-black after:mix-blend-multiply after:-skew-x-20 after:-skew-y-2deg">
      {{ props.title }}
    </span>
  </div>
</template>

<style scoped>

</style>
