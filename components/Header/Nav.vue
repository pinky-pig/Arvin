<script setup lang="ts">
import { useAppHead } from '~/composables/app'
import { navFilter } from '~/config'

const route = useRoute()
const router = useRouter()
const { appHeadTitle, setAppHeadTitle } = useAppHead()

const color = useColorMode()
const navFilterOptionBgMode = computed(() => {
  if (color.value === 'dark')
    return 'unset'

  return 'difference'
})

useHead({
  title: appHeadTitle,
})

// 每个 item 的宽高
const navItemOptions = {
  width: 80,
  height: 28,
  padding: 5,
}
// 当前选中的 item 的序号
const currentItemIndex = ref<number>(-2)
// 当前选中的 item 的背景样式
const currentItemBgStyles = computed(() => {
  return {
    width: `${navItemOptions.width}px`,
    height: `${navItemOptions.height}px`,
    transform: `translate(${currentItemIndex.value * navItemOptions.width + navItemOptions.padding}px, 5px)`,
  }
})
// 当前选中的 item 的背景动画
const currentItemBgAnimateClass = ref('custom-animate-jello')

// 1. 获取当前路由，设置当前路由
watch(
  () => route.path,
  () => {
    setNavFromRoute()
  },
  {
    immediate: true,
  },
)
function setNavFromRoute() {
  switch (true) {
    case route.path === '/':
      currentItemIndex.value = 0
      break
    case route.path === '/blog':
      currentItemIndex.value = 1
      break
    case route.path === '/archives':
      currentItemIndex.value = 2
      break

    default:
      currentItemBgAnimateClass.value = 'animate-jello-hidden'

      // currentItemIndex.value = -2
      break
  }
}

// 2. 设置当前选中的 item 的背景
function handleActiveTab(item: typeof navFilter[0], index: number) {
  currentItemIndex.value = index
  setAppHeadTitle(item.label)
  router.replace(item.route)
  currentItemBgAnimateClass.value = ''
  setTimeout(() => {
    currentItemBgAnimateClass.value = 'custom-animate-jello'
  })
}
</script>

<template>
  <div class="nav-container">
    <!-- item -->
    <div
      v-for="item, index in navFilter"
      :key="item.label"
      :to="item.route"
      class="nav-item"
      :style="{ height: `${navItemOptions.height}px`, width: `${navItemOptions.width}px` }"
      @click="handleActiveTab(item, index)"
    >
      {{ item.label }}
    </div>
    <!-- bg 外层移动，内层动画 -->
    <div
      :style="currentItemBgStyles"
      class="pointer-events-none absolute left-0 top-0 transition-transform duration-300 ease-in-out -z-1"
    >
      <div
        :class="currentItemBgAnimateClass"
        class="h-full w-full rounded-50px bg-[var(--nav-placeholder-bg)]"
      />
    </div>
  </div>
</template>

<style scoped>
.nav-container{
  position: relative;
  background: var(--nav-bg);
  border: 2px solid var(--nav-border);
  border-radius: 23px;
  display: flex;
  font-size: 14px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.nav-item{
  cursor: pointer;
  border-radius: 50px;
  -webkit-box-align: center;
  padding: 0px 16px;
  transition: opacity 0.3s ease 0s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
  color: var(--nav-text);
  mix-blend-mode: v-bind(navFilterOptionBgMode);
}

.custom-animate-jello {
  animation: jello-horizontal 0.9s both;
}
@keyframes jello-horizontal{
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.animate-jello-hidden {
  animation: jello-horizontal-hidden 0.9s both;
}
@keyframes jello-horizontal-hidden {
  0% {
    transform: scale3d(1, 1, 1);
  }
  15% {
    transform: scale3d(1.25, 0.75, 1);
  }
  30% {
    transform: scale3d(0.75, 1.25, 1);
  }
  45% {
    transform: scale3d(1.15, 0.85, 1);
  }
  60% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  90% {
    transform: scale3d(0.97, 1.03, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
}
</style>
