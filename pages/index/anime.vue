<script setup lang="ts">
import anime from 'animejs/lib/anime.js'
import { onMounted, ref } from 'vue'
// Anime Docs: https://animejs.com/documentation/
// GitHub: https://github.com/juliangarnier/anime

const pathRef = ref(null)
const greenRef = ref(null)
const redRef = ref(null)
onMounted(() => {
  const path = anime.path(pathRef.value)

  const tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750,
  })

  tl
    .add({
      targets: greenRef.value,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      duration: 2000,
      loop: true,
    })
    .add({
      targets: redRef.value,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      easing: 'linear',
      delay: 1000,
      duration: 2000,
      loop: true,
    })

  tl.play()
})

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
      <svg>
        <path ref="pathRef" d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke-width="2" stroke="white" fill="transparent" />
      </svg>
      <div ref="greenRef" class="green-circle" />
      <div ref="redRef" class="red-circle" />
    </div>
  </BubbleCard>
</template>

<style scoped>
.container{
  position: relative;
  width: 335px;
  height: 335px;
  margin: 50px auto;
}

.green-circle {
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: lime;
  border-radius: 50%;
  top:0;
  left:-10px;
}
.red-circle{
  position: absolute;
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 50%;
  top:0;
  left:-10px;
}
</style>
