<script setup lang="ts">
import { ref } from 'vue'
import V3bento from 'v3-bento'
import { bentoCellsInDesktop, bentoCellsInMobile } from './bento'

function print(val: string, e: any) {
  // console.log(val, e)
}

const maximumCells = ref(4)
const size = ref(180)
const gap = ref(10)
const containerRef = ref(null)

const isMobileRef = ref(document.body.clientWidth <= 768 && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
const disabled = ref(isMobileRef.value)
const bentoCells = ref(isMobileRef.value ? bentoCellsInMobile : bentoCellsInDesktop)

if (isMobileRef.value) {
  // 如果是移动端
  maximumCells.value = 2
  size.value = (document.body.clientWidth - 50) / 2
}
else {
  // 如果是桌面端
  maximumCells.value = 4
}

const { width } = useWindowSize()
watch(width, () => {
  // 这里有点小闪动，是因为整体 mediaQuery 的原因
  if (width.value < 380) {
    size.value = Math.max(width.value / 2 - gap.value, 100)
    maximumCells.value = 2
  }
  else if (Math.ceil(width.value / (size.value + gap.value)) <= 6) {
    maximumCells.value = Math.floor(width.value / (size.value + gap.value))
  }
  else { maximumCells.value = 6 }
}, {
  immediate: true,
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
        :disabled="disabled"
        :maximum-cells="maximumCells"
        @drag-start="print('drag-start', $event)"
        @drag-end="print('drag-end', $event)"
      />
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
