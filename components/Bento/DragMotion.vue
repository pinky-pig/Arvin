<script setup lang="ts">
const isOpen = ref(false)
/** ************************设置拖拽和旋转***************************** */
const target = ref<HTMLElement>()

const { variant, stop } = useMotion(target, {
  initial: {
    y: 100,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 20,
      delay: 50,
      onComplete: () => {
        variant.value = 'levitate'
      },
    },
  },
  levitate: {
    y: 15,
    transition: {
      duration: 2000,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
      repeatType: 'mirror',
    },
  },
})

setTimeout(() => {
  stop()
}, 6000)
const { apply } = useMotion(target, {
  initial: { rotate: 0 },

  enter: {
    rotate: 0,
  },

  levitate: {
    y: 15,
    transition: {
      duration: 2000,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
      repeatType: 'mirror',
    },
  },
})
async function setRotate(rotate: number) {
  await apply({
    rotate,
  })
}
const { x, style } = useDraggable(target, {
  initialValue: { x: 40, y: 40 },
})
/** **************************************************************** */

/** ************************通过速度计算旋转幅度***************************** */
let lastX = x.value
let startTime = performance.now()
// 当前角度 / 当前速度 = 最大角度 / 最大速度
// 得出：当前角度 = ( 最大角度 / 最大速度 ) * 当前速度
// 然后再乘以一个系数，用于调整旋转幅度，角度跟速度的比例
const cfg = {
  maxVelocity: 10, // 最大速度
  maxRotation: 90, // 最大旋转角度
  rotationFactor: 0.8, // 旋转系数，用于调整旋转幅度
}
watch(x, () => {
  const { velocity, newX, newTime } = calVelocity(lastX, x.value, startTime)
  const { maxVelocity, maxRotation, rotationFactor } = cfg
  const rotationDelta = velocity / maxVelocity * maxRotation * rotationFactor
  setRotate(rotationDelta)
  lastX = newX
  startTime = newTime
})

function calVelocity(lastX: number, currentX: number, lastTime: number, currentTime = performance.now()) {
  const distanceX = currentX - lastX
  const deltaTime = currentTime - lastTime
  return {
    velocity: distanceX / deltaTime,
    newTime: currentTime,
    newX: currentX,
  }
}
/** **************************************************************** */
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
