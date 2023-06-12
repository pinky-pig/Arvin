<script setup lang="ts">
defineProps({
  hasAnimation: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const detailBox = ref<HTMLElement | null>(null)

defineExpose({
  bubble,
})

document.body.style.overflow = 'hidden'
onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
// 这里本来上升和下降都是使用 requestAnimationFrame 实现的，但是在 Safari 上会出现卡顿的情况，所以改为使用 CSS 动画
function bubble(type: number, div = (detailBox.value as HTMLElement)) {
  const duration = 600 // 动画持续时间
  let startTime = 0 // 动画开始时间
  const from = type === 0 ? div.getBoundingClientRect().bottom : div.getBoundingClientRect().top // 起始位置
  const to = type === 0 ? 0 : window.innerHeight// 结束位置
  let percent = 0 // 当前位置在整个过程中的百分比

  function animate(timestamp: number) {
    if (!startTime)
      startTime = timestamp
    const elapsed = timestamp - startTime
    percent = Math.min(elapsed / duration, 1) // 计算当前位置在整个过程中的百分比
    const distance = to - from // 起始位置到结束位置的距离
    const currentPos = from + distance * percent // 根据百分比计算实际位置
    div.style.transform = `translateY(${currentPos}px) translateZ(0px)`

    if (percent < 1)
      requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}
</script>

<template>
  <div ref="detailBox" :class="hasAnimation ? 'bubbleCardUp' : ''" class="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col">
    <nav class="bg-[var(--card--placeholder-bg)] px-4 py-3 font-medium md:px-8">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-4">
          <slot name="icon" />
          <span>
            <slot name="title" />
          </span>
        </div>
        <div class="flex items-center justify-end gap-2">
          <slot name="operate-button" />
        </div>
      </div>
    </nav>
    <main class="flex-1 flex-grow-2 overflow-hidden bg-[var(--background)] p-4">
      <slot />
    </main>
    <div class="bg-[var(--background)]">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.bubbleCardUp{
  animation: slide-up .6s ease-in-out;
}

@keyframes slide-up {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
