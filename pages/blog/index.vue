<script setup lang="ts">

</script>

<template>
  <div
    class="blog-container mx-auto max-w-960px gap-10px rounded-xl px-5px text-start md:px-25px"
  >
    <ContentList v-slot="{ list }" path="/post">
      <div
        v-for="article in list"
        :key="article._path"
        style="border: 5px solid var(--blog-card-border);"
        class="flex flex-col justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] pb-10px shadow-md"
      >
        <NuxtLink
          tag="a"
          :to="`/blog${article._path}`"
        >
          <!-- 配图 -->
          <img
            src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images团建.jpg?x-oss-process=image/resize,w_640/format,webp"
            class="lozad block h-200px w-full object-cover md:h-160px"
          >
          <!-- 标题 -->
          <div class="w-full flex items-center justify-between pl-3 pr-3 pt-4 leading-tight">
            <div class="text-gray-800">
              {{ parseTitleFromContentList(article.title) }}
            </div>
            <div class="text-grey-darker text-sm text-gray-600">
              {{ article.date }}
            </div>
          </div>
          <!-- 描述 -->
          <p class="line-clamp-2 h-50px w-full overflow-hidden px-12px pt-10px text-sm text-gray-600">
            {{ article.desc }}
          </p>
        </NuxtLink>
      </div>
    </ContentList>
  </div>
</template>

<style scoped>
.blog-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
