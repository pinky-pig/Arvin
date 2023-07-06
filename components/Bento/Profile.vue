<script setup lang="ts">
import Typed from 'typed.js'

const typedInstance = ref<Typed>()
const iconRef = ref<HTMLElement | null>(null)
const avatarBgRef = ref<HTMLElement | null>(null)
const avatarImgRef = ref<HTMLElement | null>(null)
const currentAvatar = ref('Arvin')
function handleSwitch() {
  clearAllSetTimeout()
  avatarImgRef.value?.classList.add('expanding-avatar-circle')
  setTimeout(() => {
    currentAvatar.value = currentAvatar.value === 'Arvin' ? 'Arvin2' : 'Arvin'
    avatarBgRef.value?.classList.add('expanding-bg-circle')
    setTimeout(() => {
      avatarBgRef.value?.classList.remove('expanding-bg-circle')
    }, 1000)
  }, 500)

  setTimeout(() => {
    avatarImgRef.value?.classList.remove('expanding-avatar-circle')
  }, 1000)

  typedRestart()
}

function clearAllSetTimeout() {
  let id = setTimeout(() => { }, 0) as unknown as number
  while (id--)
    clearTimeout(id)
}

// https://jsfiddle.net/mattboldt/60h9an7y/
const $s1h = ref<HTMLElement>()
const $s1 = ref<HTMLElement>()

onMounted(async () => {
  typedInstance.value = await typeSentence1()
})

function typedRestart() {
  typedInstance.value?.reset()
}
async function typeSentence1() {
  return new Promise<Typed>((resolve) => {
    const _ = new Typed($s1.value, {
      stringsElement: $s1h.value,
      // cursorChar: ' ▋ ', // 光标字符
      typeSpeed: 50,
      onBegin(self) {
        // self.cursor.style.opacity = '1'
      },
      onComplete(self) {
        self.cursor.style.opacity = '0'
        // resolve(self)
      },
    })

    resolve(_)
  })
}
</script>

<template>
  <UiShadowCard class="!p-5px">
    <div>
      <div ref="$s1h" hidden>
        <div>
          <span class="text-20px font-[monospace]">
            我是
            <span class="text-30px font-[cursive]">王文博</span>
            , 目前生活在南京的开发者。我很喜欢 Vue、Nuxt。目前从事前端开发及 WebGIS 。
          </span>
        </div>
      </div>
    </div>

    <div class="pointer-events-none relative p-1.5em">
      <div class="relative mb-30px h-96px w-96px">
        <div ref="avatarImgRef" class="avatar-img absolute left-0 top-0 z-20 mb-8 h-96px w-96px rounded-full dark:bg-[var(--header-avatar-bg)]">
          <div v-if="currentAvatar === 'Arvin'" class="h-full w-full" i-fluent-emoji:partying-face />
          <img v-else ref="avatarImgRef" class="h-full w-full" src="/logo.png" alt="">
        </div>
        <div ref="avatarBgRef" class="avatar-bg" />
      </div>

      <span ref="$s1" />

      <button class="switch-btn pointer-events-auto" @click="handleSwitch">
        <div ref="iconRef" class="icon" :class="currentAvatar === 'Arvin' ? 'icon_rotate_one' : 'icon_rotate_two'" style="transform: rotate(0);">
          <svg
            width="15.702"
            height="15.702"
            viewBox="0 0 15.702 15.702"
          >
            <g transform="translate(2.62 2.617)">
              <path d="M14.8,12.032a5.229,5.229,0,0,1-9.824,2.482" transform="translate(-4.34 -6.777)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M4,9.149A5.231,5.231,0,0,1,13.83,6.731" transform="translate(-4.004 -4)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M15.953,6.952h2.313V4.639" transform="translate(-8.135 -4.221)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
              <path d="M6.825,15.825H4.512v2.313" transform="translate(-4.18 -8.088)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" />
            </g>
            <path id="Path_9" data-name="Path 9" d="M0,0H15.7V15.7H0Z" fill="none" />
          </svg>
        </div>
        <p class="text">
          Toggle
        </p>
      </button>
    </div>
  </UiShadowCard>
</template>

<style scoped>
.intro-text{
  margin-top: 60px;
  text-align: start;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.5px;
  font-weight: 400;
  color: var(--text-color);
}
.switch-btn{
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  position: absolute;
  height: 36px;
  padding: 0px 12px;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 18px;
  background: transparent;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.2s ease-out 0s;
  will-change: box-shadow, transform;
  gap: 10px;
  transition: box-shadow 0.2s ease-out 0s;
}
.switch-btn:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
.switch-btn .icon{
  color: var(--text-color);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

}
.switch-btn .text{
  line-height: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-weight: 400;
  color: var(--text-color);
  margin-left: 6px;
}
.avatar-img{
  border-radius: 50%;
  box-shadow: var(--header-avatar-shadow), var(--header-avatar-shadow-1);
}

.icon_rotate_one{
  animation: rotation .5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.icon_rotate_two{
  animation: rotation-reverse .5s cubic-bezier(0.42, 0, 1, 1) forwards;
  transform: rotate(180deg);
}
@keyframes rotation-reverse {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.expanding-bg-circle{
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 42px;
  transform: translate(-50%, 0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: transparent;
  animation: bg-expanding 1s cubic-bezier(0.42, 0, 0.5, 1) forwards;
}

.expanding-avatar-circle{
  animation: avatar-expanding 1s cubic-bezier(0.42, 0, 0.5, 1) forwards;
}
@keyframes bg-expanding {
  0% {
    background-color: rgba(152, 208, 255, 0.5);
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    background-color: rgba(152, 208, 255, 0.5);
    opacity: 0;
    transform: scale(40);
  }
}

@keyframes avatar-expanding {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  25% {
    opacity: 0.5;
    transform: scale(0.5) rotate(-15deg) ;
  }
  50% {
    opacity: 0;
    transform: scale(0) rotate(-30deg) ;
  }
  75%{
    opacity: 0.5;
    transform: scale(0.5) rotate(-15deg) ;
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg) ;
  }
}
</style>
