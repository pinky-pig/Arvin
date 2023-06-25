<script setup lang="ts">
import { PROJECTS } from '~~/config'
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mx-auto max-w-970px justify-center gap-10px rounded-xl px-5px text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-25px">
    <CustomCardNoise
      v-for="project in PROJECTS"
      :key="project.name"
      style="border: 5px solid var(--blog-card-border);"
      class="flex flex-col justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] pb-10px text-[var(--blog-card-text)] shadow-md"
    >
      <div>
        <!-- 配图 -->
        <img
          :src="project.cover"
          class="lozad block h-200px w-full object-cover md:h-160px"
        >
        <!-- 标题 -->
        <div class="w-full flex items-center justify-between pl-3 pr-3 pt-4 leading-tight text-[var(--blog-card-text)]">
          <div class="truncate">
            {{ project.name }}
          </div>
          <div class="text-sm">
            <a :href="project.repoUrl" target="_blank" class="cursor-pointer">
              <div i-carbon-logo-github />
            </a>
          </div>
        </div>
        <!-- 描述 -->
        <p class="line-clamp-2 h-50px w-full overflow-hidden px-12px pt-10px text-sm text-[var(--blog-card-text)]">
          {{ project.desc }}
        </p>
      </div>
    </CustomCardNoise>
  </div>
</template>
