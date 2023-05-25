<script setup lang="ts">
import type { IBlog } from '~/config/types'

const articles = ref<IBlog[]>()
articles.value = await parseList()
</script>

<template>
  <ul>
    <li v-for="(item, index) in articles" :key="index" class="group">
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
</template>
