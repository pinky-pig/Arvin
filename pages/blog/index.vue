<script setup lang="ts">
import List from './list.vue'
import Title from './title.vue'
</script>

<template>
  <div
    style=" background-color: var(--blog-bg); border: 1px solid var(--blog--border ); "
    class=" max-w-960px mx-auto px-10px text-start rounded-xl md:px-36px"
  >
    <Title title="全部文章" />
    <List />
  </div>
</template>
