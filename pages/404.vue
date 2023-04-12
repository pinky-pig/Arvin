<script setup lang="ts">
import V3bento from 'v3-bento'

import { bentoCellsInDesktop, bentoCellsInMobile } from './bento/bento'

definePageMeta({
  layout: 'home',
  key: route => route.fullPath,
  keepalive: true,
})

function print(val: string, e: any) {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)
const containerRef = ref(null)
const isMobileRef = ref(document.body.clientWidth <= 768 && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
const disabled = ref(isMobileRef.value)
const bentoCells = ref(isMobileRef.value ? bentoCellsInMobile : bentoCellsInDesktop)
</script>

<template>
  <button
    class="
      rounded-md
      border
      p-2
      outline-none
      dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-100
    "
    @click="useToggleTheme"
  >
    切换主题
  </button>
  <div
    text="xl gray4"
    flex
    justify-center
    gap-3
  >
    <div
      w-full
      mx-auto
      grid
      place-items-center
      select-none
    >
      <client-only placeholder="loading...">
        <V3bento
          class="bento-container"
          :bento-cells="bentoCells"
          :size="size"
          :gap="gap"
          :disabled="disabled"
          :maximum-cells="maximumCells"
          @drag-start="print('drag-start', $event)"
          @drag-end="print('drag-end', $event)"
        />
      </client-only>
    </div>
  </div>
  <NuxtPage />
</template>

<style scoped>
.bento-container {
  margin-left: auto;
  margin-right: auto;
}
:deep(.bento-item-placeholder){
  border-radius: 12px !important;
  background-color: var(--card--placeholder-bg);
}
</style>
