<script setup lang="ts">
import List from './list.vue'
import Title from './title.vue'
</script>

<template>
  <div style=" background-color: var(--blog-bg); border: 1px solid var(--blog--border ); "
    class="mx-auto max-w-960px rounded-xl px-10px text-start md:px-36px">
    <Title title="全部文章" />
    <!-- <List /> -->

    <div>
      <ContentList v-slot="{ list }" path="/post">
        <div v-for="article in list" :key="article._path">
          {{ article.tags }}
          {{ article.desc }}
          {{ article.date }}
          {{ article.title }}
        </div>
      </ContentList>
    </div>
  </div>
</template>
