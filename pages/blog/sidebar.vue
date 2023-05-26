<script setup lang="ts">
import { SITE } from '~/config/param'
import type { IBlog } from '~/config/types'

const allBlogs = ref<IBlog[]>()
allBlogs.value = await parseList()
</script>

<template>
  <nav class="h-full ">
    <div class="flex flex-row">
      <img class="w-40px h-40px" :src="SITE.icon" alt="">
      <h1 class="">
        {{ SITE.title }}
      </h1>
    </div>

    <ul class="nav-groups">
      <li v-for="item, index in allBlogs" :key="index">
        <div class="nav-group">
          <ul>
            <li class="nav-link">
              {{ item.title }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
