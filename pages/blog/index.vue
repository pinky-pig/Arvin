<script setup lang="ts">
import List from './list.vue'
import Title from './title.vue'
import Pagination from './pagination.vue'

const page = ref({
  prev: '',
  next: '',
  total: 5,
  current: 1,
})
</script>

<template>
  <div
    style=" background-color: var(--blog-bg); border: 3px solid var(--blog--border ); "
    class=" max-w-960px mx-auto px-20px text-start rounded-xl md:px-36px"
  >
    <Title title="全部文章" />
    <List />
    <Pagination :page="page" />
  </div>
</template>

<style scoped>

</style>
