<script setup lang="ts">
import type { IBlog } from '~/config/types'

const allBlogs = ref<IBlog[]>()
allBlogs.value = await parseList()

const pageOption = reactive({
  pageSize: 5,
  currentPage: 1,
  total: allBlogs.value.length,
})

const renderBlogs = computed(() => {
  const { pageSize, currentPage } = pageOption
  const start = (currentPage - 1) * pageSize
  const end = currentPage * pageSize
  return allBlogs.value!.slice(start, end)
})

const hasPrev = computed(() => pageOption.currentPage > 1)
const hasNext = computed(() => pageOption.currentPage < Math.ceil(pageOption.total / pageOption.pageSize))
function jumpPrevPage(page: number) {
  if (hasPrev.value)
    pageOption.currentPage = page
}
function jumpNextPage(page: number) {
  if (hasNext.value)
    pageOption.currentPage = page
}
</script>

<template>
  <ul>
    <li v-for="(item, index) in renderBlogs" :key="index" class="group">
      <article
        itemscope
        itemtype="http://schema.org/BlogPosting"
        class="flex border-t border-black dark:border-white border-opacity-8 dark:border-opacity-8 flex-col py-4 relative"
      >
        <h2
          itemprop="headline"
          class="text-6 hover:underline focus-visible:underline focus:underline"
        >
          <a :href="item.link">
            {{ item.title }}
          </a>
        </h2>

        <div itemprop="articleBody" class="my-4 text-opacity-82 text-sm text-neutral-600 dark:text-neutral-300">
          <a :href="item.link">
            {{ item.desc }}
          </a>
        </div>

        <div class="flex items-center text-neutral-600 dark:text-neutral-300">
          <span class="text-xs">
            <span>发布于&nbsp;</span>
            <time
              itemprop="datePublished"
            >
              {{ item.date }}
            </time>
          </span>
          <div class="space-x-2 flex items-center ml-4" aria-label="Tags for this post">
            <a
              v-for="tag in item.tags"
              :key="tag"
              :title="tag"
              href="/tags/Develop"
              class="inline-block text-xs motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-in hover:underline"
            >
              {{ tag }}
            </a>
          </div>
        </div>
      </article>
    </li>
  </ul>

  <div class="pt-6 pb-8 text-sm">
    <nav class="flex justify-between">
      <a
        aria-label="Prev page"
        class="flex items-center cursor-pointer"
        :class="!!hasPrev ? 'hover:underline' : 'op-30'"
        @click="jumpPrevPage(pageOption.currentPage - 1)"
      >
        <div class="i-ri:arrow-left-double-line" />
        <span>Prev</span>
      </a>
      <span>
        {{ pageOption.currentPage }}/{{ Math.ceil(pageOption.total / pageOption.pageSize) }}
      </span>
      <a
        aria-label="Next page"
        class="flex items-center cursor-pointer"
        :class="!!hasNext ? 'hover:underline' : 'op-30'"
        @click="jumpNextPage(pageOption.currentPage + 1)"
      >
        <span>Next</span>
        <div class="i-ri:arrow-right-double-line" />
      </a>
    </nav>
  </div>
</template>
