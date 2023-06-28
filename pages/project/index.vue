<script setup lang="ts">
import { PROJECTS } from '~~/config'

const isOpen = ref(false)
const currentProject = ref<typeof PROJECTS[0]>()

function openModal(item: typeof PROJECTS[0]) {
  currentProject.value = item
  isOpen.value = true
}
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mx-auto max-w-970px justify-center gap-10px rounded-xl px-5px text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-25px">
    <div
      v-for="project in PROJECTS"
      :key="project.name"
      style="border: 5px solid var(--blog-card-border);"
      class="box relative flex flex-col cursor-pointer justify-center overflow-hidden border-[var(--blog-card-border)] rounded-12px border-solid bg-[var(--blog-card-bg)] object-cover text-[var(--blog-card-text)] shadow-md hover:opacity-100"
      @click="openModal(project)"
    >
      <!-- 配图 -->

      <div class="image min-h-200px w-full select-none px-10px py-20px duration-500">
        <img
          :src="project.cover"
          class="pointer-events-none block h-full w-full rounded-md object-cover"
        >
      </div>
      <!-- 标题 -->
      <div
        class="title absolute bottom-0 left-0 h-56px w-full flex items-center justify-between from-slate-900/5 to-slate-900/60 bg-gradient-to-b p-4 pl-3 pr-3 leading-tight text-[var(--project-card-text)] opacity-0 backdrop-blur-md duration-500 ease-in-out"
      >
        <div class="truncate">
          {{ project.name }}
        </div>
        <div class="grid h-10 w-10 place-items-center rounded-md bg-opacity-0 duration-500 ease-in-out hover:bg-slate-100 hover:bg-opacity-50 hover:text-black">
          <a :href="project.demoUrl" target="_blank" class="cursor-pointer" @click="event => event.stopPropagation()">
            <svg class="z-10" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path opacity="0.2" d="M7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14L10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" fill="currentColor" />
              <path d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <ClientOnly>
      <UModal v-model="isOpen" :ui="{ background: 'bg-transparent', rounded: 'rounded-[20px]' }">
        <UiShadowCard v-if="currentProject" class="p-4">
          <template #default>
            <div class="mb-4 flex flex-row items-center justify-between">
              <h2 class="text-[1.25rem] font-bold">
                {{ currentProject.name }}
              </h2>

              <div class="cursor-pointer hover:opacity-50" i-carbon-close @click="isOpen = false" />
            </div>
            <img
              :src="currentProject.cover"
              class="pointer-events-none mb-4 block h-full w-full rounded-md object-cover"
            >
          </template>

          <template #footer>
            <div class="flex flex-row justify-between">
              <UiShadowButton class="rounded-md">
                <div class="truncate">
                  {{ currentProject.desc }}
                </div>
              </UiShadowButton>
              <div class="flex flex-shrink-0 flex-row gap-4">
                <UiShadowButton class="rounded-md">
                  <a class="cursor-pointer border-none outline-none" :href="currentProject.repoUrl" target="_blank">
                    <div class="h-24px w-24px border-none outline-none" i="carbon-logo-github" />
                  </a>
                </UiShadowButton>
                <UiShadowButton class="rounded-md">
                  <a class="cursor-pointer outline-none" :href="currentProject.demoUrl" target="_blank">
                    <svg class="z-10" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path opacity="0.2" d="M7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14L10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" fill="currentColor" />
                      <path d="M21 9L21 3M21 3H15M21 3L13 11M10 5H7.8C6.11984 5 5.27976 5 4.63803 5.32698C4.07354 5.6146 3.6146 6.07354 3.32698 6.63803C3 7.27976 3 8.11984 3 9.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </a>
                </UiShadowButton>
              </div>
            </div>
          </template>
        </UiShadowCard>

        <div v-else italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </UModal>
    </ClientOnly>
  </div>
</template>

<style scoped>
.box:hover .title {
  opacity: 1;
}
.box:hover .image {
  transform: scale(1.1);
}
</style>
