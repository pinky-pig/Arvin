<script setup lang="ts">
const detailBox = ref<HTMLElement | null>(null)

defineExpose({
  bubble,
})

onMounted(() => {
  // 取消父级组件滚动条的影响
  document.body.style.overflow = 'hidden'
})

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
  <div ref="detailBox" class="bubbleCardUp fixed top-0 left-0 bottom-0 right-0 z-50 flex flex-col">
    <nav class="py-3 px-4 md:px-8 bg-[var(--card--placeholder-bg)] font-medium">
      <div class="flex gap-2 items-center justify-between">
        <div class="flex gap-4 items-center">
          <slot name="icon" />
          <span>
            <slot name="title" />
          </span>
        </div>
        <div class="flex gap-2 items-center justify-end">
          <slot name="operate-button" />
        </div>
      </div>
    </nav>
    <main class="p-4 flex-grow-2 bg-[var(--background)]">
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
