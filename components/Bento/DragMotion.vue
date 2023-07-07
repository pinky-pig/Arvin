<script setup lang="ts">
const isOpen = ref(false)

const target = ref<HTMLElement>()
const { apply } = useMotion(target, {
  initial: { rotate: 0 },
  enter: { rotate: 0 },
})

async function setRotate(rotate: number) {
  await apply({
    rotate,
  })
}

const { x, style } = useDraggable(target, {
  initialValue: { x: 40, y: 40 },
})

// 1. 拖拽过程中，通过计算拖拽的速度来计算晃动 rotate 的幅度
// 2. 拖拽的速度越大，晃动的幅度越大
// 3. 拖拽的速度越小，晃动的幅度也越小
// 5. 往右移动，晃动的幅度为正数，最大为 18
// 6. 往左移动，晃动的幅度为负数，最小为 -18

const maxVelocity = 10 // 最大速度
const maxRotation = 90 // 最大旋转角度
const rotationFactor = 0.8 // 旋转系数，用于调整旋转幅度

let lastX = computed(() => x.value).value
let startTime = performance.now()
const currentVelocity = ref(0)

watch(x, () => {
  const currentX = x.value
  const currentTime = performance.now()

  const distanceX = currentX - lastX
  const deltaTime = currentTime - startTime

  currentVelocity.value = distanceX / deltaTime

  const rotationDelta = currentVelocity.value / maxVelocity * maxRotation * rotationFactor
  setRotate(rotationDelta)

  lastX = currentX
  startTime = currentTime
})
</script>

<template>
  <UiShadowCard class="!p-5px">
    <div class="grid h-full w-full place-items-center text-[--text-color]" @click="isOpen = true">
      <div class="pointer-events-auto h-30px w-30px cursor-pointer" i-carbon:blockchain />
    </div>
    <ClientOnly>
      <UModal v-model="isOpen">
        <div class="relative h-60vh w-full border-5px border-[var(--modal-border)] border-solid">
          <div
            ref="target"
            :style="style"
            class="fixed grid h-100px w-100px cursor-pointer place-items-center rounded-md bg-[#FAF769]"
          >
            <div class="h-32px w-32px" i-carbon:face-wink />
          </div>
        </div>
      </UModal>
    </ClientOnly>
  </UiShadowCard>
</template>
