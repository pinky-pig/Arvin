<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import V3bento from 'v3-bento'

import { bentoCells } from './bento'
// import V3bento from '../../packages/v3-bento/dist/v3-bento.es.js'
const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}

const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)

const containerRef = ref(null)

// 找出 bentoCells 中最大的宽度

useResizeObserver(containerRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect

  // todo: 这里最好修改，如果当前的宽度除以当前的尺寸，
  // 比如 2 * size < width < 3 * size
  // 那么就缩小这个 size ，正好能显示三个
  // if (width < size.value * 2 + gap.value * 2) {
  //   // 当前的宽度小于两个 cell 的宽度，那么就显示两个，但是修改尺寸为正好放下两个的尺寸
  //   size.value = width / 2 - gap.value
  //   maximumCells.value = 2
  // }
  // else {
  if (Math.ceil(width / (size.value + gap.value)) <= 6) {
    maximumCells.value = Math.floor(width / (size.value + gap.value))
    size.value = 180
  }
  else {
    maximumCells.value = 6
    size.value = 240
  }
  // }
})
</script>

<template>
  <div ref="containerRef" class="container">
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
</template>

<style scoped>
.container {
  height: 60vh;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
  user-select: none;
}

.bento-container {
  margin-left: auto;
  margin-right: auto;
}
:deep(.bento-item-placeholder){
  border-radius: 12px !important;
  background-color: var(--card--placeholder-bg);
}
</style>
