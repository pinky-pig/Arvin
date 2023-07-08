<script setup lang="ts">
// 1. 具有两个动画，一个是上下浮动，一个是拖拽的时候会有小幅度旋转
// 2. 拖拽的时候，根据速度计算旋转幅度，这个时候上下浮动消失
// 3. 拖拽结束后（速度小于一个阈值或者鼠标抬起或者鼠标移动到了外面），旋转幅度取消，上下浮动重新开始

/** ************************设置拖拽和旋转***************************** */
const target = ref<HTMLElement>()
const { apply: waveApply } = useMotion(target, {
  initial: { rotate: 0 },
  enter: { rotate: 0 },
})

const bounceInstance = useMotion(target, {
  initial: {
    rotate: 0,
    y: 0,
  },
  enter: {
    rotate: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 0,
      delay: 50,
      onComplete: () => {
        bounceInstance.variant.value = 'levitate'
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

async function setRotate(rotate: number) {
  // await waveApply({
  //   rotate,
  // })
}

const { x, style, isDragging } = useDraggable(target, {
  initialValue: { x: 40, y: 40 },
})

watch(isDragging, async () => {
  if (isDragging.value) {
    await bounceInstance.stop()
  }
  else {
    setTimeout(async () => {
      setRotate(0)
      await bounceInstance.apply('enter')
    }, 800)
  }
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
  <div
    ref="target"
    :style="style"
    class="fixed grid h-100px w-100px cursor-pointer place-items-center rounded-md bg-[#FAF769]"
  >
    <div class="h-32px w-32px" i-carbon:face-wink />
  </div>
</template>

<style scoped>

</style>
