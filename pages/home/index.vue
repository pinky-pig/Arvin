<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import V3bento from 'v3-bento'
import { bentoCells } from './bento'

definePageMeta({
  layout: 'home',
})

const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)
const containerRef = ref(null)

useResizeObserver(containerRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect

  // todo: 这里最好修改，如果当前的宽度除以当前的尺寸，
  // 比如 2 * size < width < 3 * size
  // 那么就缩小这个 size ，正好能显示三个
  if (width < 380) {
    maximumCells.value = 2
    size.value = width / 2 - gap.value
    return
  }
  if (Math.ceil(width / (size.value + gap.value)) <= 6) {
    maximumCells.value = Math.floor(width / (size.value + gap.value))
    size.value = 180
  }
  else {
    maximumCells.value = 6
    size.value = 180
  }
})
</script>

<template>
  <div
    text="xl gray4"
    flex
    justify-center
    gap-3
  >
    <div
      ref="containerRef"
      w-full
      mx-auto
      grid
      place-items-center
      select-none
    >
      <V3bento
        class="bento-container"
        :bento-cells="bentoCells"
        :size="size"
        :gap="gap"
        :maximum-cells="maximumCells"
        @drag-start="print('drag-start', $event)"
        @drag-end="print('drag-end', $event)"
      />
    </div>
  </div>
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
