<script setup lang="ts">
import { onMounted, ref } from 'vue'
// Anime Docs: https://animejs.com/documentation/
// GitHub: https://github.com/juliangarnier/anime
import anime from 'animejs'

// 这里的思路很清晰，就是有四段路径
// 一段一段的移动

// 这个是 最主要的那个 这里以 绿色小球为原型
const currentItem = ref(0)

const duration_setting = 1000
const pause_setting = 2000

// 1. 有四段路径 Dom
const pathRef0 = ref(null)
const pathRef1 = ref(null)
const pathRef2 = ref(null)
const pathRef3 = ref(null)
const pathRef4 = ref(null)
const pathRefArray = [pathRef0, pathRef1, pathRef2, pathRef3, pathRef4]

const greenRef = ref(null)
const redRef = ref(null)
const blueRef = ref(null)
const orangeRef = ref(null)
const grayRef = ref(null)

// 2. 有四个动画时间线
const completeCallback = function (_e: anime.AnimeInstance) { }
const tlArray = new Array(pathRefArray.length).fill(0).map((_, i) => {
  const tl = anime.timeline({
    id: `tl${i}`,
    autoplay: false,
    complete(e) {
      completeCallback(e)
    },
  })
  return tl
})

onMounted(() => {
  // 3. 初始化路径
  const pathArray = tlArray.map((_, i) => {
    const tl = anime.path(pathRefArray[i].value)
    return tl
  })

  // 4. 初始化每段路径的动画
  const curveArray = pathArray.map((p, i) => {
    const tl = { translateX: p('x'), translateY: p('y'), rotate: p('angle') }
    return tl
  })

  const greenKeyFrames = [curveArray[0], curveArray[1], curveArray[2], curveArray[3], curveArray[4]]
  const redKeyFrames = [curveArray[1], curveArray[2], curveArray[3], curveArray[4], curveArray[0]]
  const orangeKeyFrames = [curveArray[2], curveArray[3], curveArray[4], curveArray[0], curveArray[1]]
  const blueKeyFrames = [curveArray[3], curveArray[4], curveArray[0], curveArray[1], curveArray[2]]
  const grayKeyFrames = [curveArray[4], curveArray[0], curveArray[1], curveArray[2], curveArray[3]]

  greenKeyFrames.forEach((item, i) => {
    tlArray[0].add({
      targets: greenRef.value,
      easing: 'linear',
      duration: duration_setting,
      ...item,
      complete(anim) {
        if (i === pathRefArray.length - 1) {
          currentItem.value = 0
          setTimeout(() => {
            reStart()
          }, pause_setting)
        }
        else {
          currentItem.value = i + 1

          pausePlay()
          setTimeout(() => {
            startPlay()
          }, pause_setting)
        }
        // eslint-disable-next-line no-console
        console.log('greenKeyFrames 第', currentItem.value, '个位置')
      },
    })
  })
  redKeyFrames.forEach((item, i) => {
    tlArray[1].add({
      targets: redRef.value,
      easing: 'linear',
      duration: duration_setting,
      ...item,
      loop: true,
    })
  })
  orangeKeyFrames.forEach((item, i) => {
    tlArray[2].add({
      targets: orangeRef.value,
      easing: 'linear',
      duration: duration_setting,
      ...item,
    })
  })
  blueKeyFrames.forEach((item, i) => {
    tlArray[3].add({
      targets: blueRef.value,
      easing: 'linear',
      duration: duration_setting,
      ...item,
    })
  })
  grayKeyFrames.forEach((item, i) => {
    tlArray[4].add({
      targets: grayRef.value,
      easing: 'linear',
      duration: duration_setting,
      ...item,
    })
  })
})

const isPlay = ref('stop')
function pausePlay() {
  isPlay.value = 'paused'

  tlArray.forEach((tl) => {
    tl.pause()
  })
}
function stopPlay() {
  isPlay.value = 'stop'

  tlArray.forEach((tl) => {
    tl.pause()
    tl.seek(0)
  })
}
function reStart() {
  tlArray.forEach((tl) => {
    tl.restart()
  })
}

function startPlay() {
  tlArray.forEach((tl) => {
    tl.play()
  })
  isPlay.value = 'running'
}

const router = useRouter()
const bubbleCardRef = ref<HTMLElement | null>(null)
function toHome() {
  bubbleCardRef.value && (bubbleCardRef.value as any).bubble(1)

  setTimeout(() => {
    router.push('/')
  }, 600)
}
</script>

<template>
  <BubbleCard ref="bubbleCardRef">
    <div class="container relative">
      <svg class="w-full h-full" viewBox="-25 200 670 560">
        <!-- M 30 56 Q 14 56 6 48 Q 0 40 12 33 Q 30 25 50 33 Q 62 40 54 48 Q 46 56 30 56 Z -->
        <path ref="pathRef0" d="M 300 560 Q 140 560 60 480" stroke-width="1" stroke="white" fill="transparent" />
        <path ref="pathRef1" d="M 60 480 Q 10 400 120 330 " stroke-width="1" stroke="white" fill="transparent" />
        <path ref="pathRef2" d="M 120 330 Q 300 250 500 330 " stroke-width="1" stroke="white" fill="transparent" />
        <path ref="pathRef3" d="M 500 330 Q 620 400 540 480 " stroke-width="1" stroke="white" fill="transparent" />
        <path ref="pathRef4" d="M 540 480 Q 460 560 300 560 " stroke-width="1" stroke="white" fill="transparent" />
      </svg>
      <div ref="greenRef" class="green-circle" />
      <div ref="redRef" class="red-circle" />
      <div ref="blueRef" class="blue-circle" />
      <div ref="orangeRef" class="orange-circle" />
      <div ref="grayRef" class="gray-circle" />
    </div>

    <div
      flex flex-row justify-center items-center
      w-full
      gap-4
    >
      <button class="rounded-full">
        <div v-if="isPlay !== 'running'" class=" w-8 h-8 cursor-pointer bg-green-400 animate-btn" i="carbon-play-outline" @click="startPlay" />
        <div v-else class=" w-8 h-8 cursor-pointer bg-[#FDD352] animate-btn" i="carbon-pause-outline" @click="pausePlay" />
      </button>

      <button :disabled="isPlay === 'stop'" class="animate-btn rounded-full">
        <div :class="isPlay === 'stop' ? 'bg-[#E4E5EE30]' : 'bg-[#FF6168]'" class=" w-8 h-8 cursor-pointer" i="carbon-stop-outline" @click="stopPlay" />
      </button>
    </div>
  </BubbleCard>
</template>

<style scoped>
.container{
  position: relative;
  width: fit-content;
  height: 200px;
  margin: 50px auto;
}

.green-circle {
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: lime;
  border-radius: 50%;
  top: -10px;
  left: -10px;
}
.red-circle{
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
  top: -10px;
  left: -10px;
}
.blue-circle{
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: blue;
  border-radius: 50%;
  top: -10px;
  left: -10px;
}
.orange-circle{
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: orange;
  border-radius: 50%;
  top: -10px;
  left: -10px;
}
.gray-circle{
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: gray;
  border-radius: 50%;
  top: -10px;
  left: -10px;
}

button{
  outline: 2px dotted transparent;
  outline-offset: -2px;
  transition: outline 0.12s ease, outline-offset 0.12s ease;
}
button:focus{
  outline: 2.5px dashed #4AA0EA !important;
  stroke-dashoffset: 12px;
  outline-offset: 2px;
  transition: outline 0.12s ease, outline-offset 0.12s ease;
  transform: scaleX(1.1) scaleY(1.1);
}
button:active {
  outline: 2px dotted transparent;
  transform: scaleX(1) scaleY(1);
}
</style>
