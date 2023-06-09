<script setup lang="ts">
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

onMounted(() => {
  initActiveTab()
})

watch(
  () => route.fullPath,
  () => {
    nextTick(() => {
      initActiveTab()
    })
  },
)

const currentItem = ref<typeof navFilter[0] | null>(navFilter[0])
const currentItemBgRef = ref<HTMLElement>()
const animateDom = computed(() => {
  if (currentItemBgRef.value && currentItemBgRef.value?.children && currentItemBgRef.value?.children[0])
    return currentItemBgRef.value?.children[0]
  else
    return null
})

// 选中当前选项卡
function handleActiveTab(item: typeof navFilter[0], index: number) {
  if (animateDom.value instanceof HTMLElement) {
    animateDom.value?.classList?.remove('animate-jello')
    currentItemBgRef.value!.style.transform = `translate(${(document.querySelectorAll('.filter-option')[index] as HTMLElement).offsetLeft + 5}px, 5px)`
    animateDom.value?.classList?.add('animate-jello')
    setAppHeadTitle(item.label)
    currentItem.value = item
    router.replace(item.route)
  }
}

function initActiveTab() {
  let defaultItem: { item: typeof navFilter[0]; index: number } | null = null
  navFilter.forEach((item, index) => {
    if (item.route === route.path)
      defaultItem = { item, index }
  })

  if (defaultItem) {
    handleActiveTab(
      (defaultItem as { item: typeof navFilter[0]; index: number }).item,
      (defaultItem as { item: typeof navFilter[0]; index: number }).index,
    )
  }
}
</script>

<template>
  <div
    id="nav-bg"
    class="
      w-full h-fit md:h-80px
      px-3.5vw py-18px md:py-unset
      fixed top-0 left-0 z-2
      flex flex-col md:flex-row justify-between items-center
    "
  >
    <img
      class="w-72px h-72px mt-0px md:w-56px md:h-56px md:mt-0 hidden md:block"
      src="/logo.svg"
      alt=""
    >

    <div class="nav-filter">
      <div
        v-for="item, index in navFilter"
        :key="item.label"
        :to="item.route"
        class="filter-option"
        @click="handleActiveTab(item, index)"
      >
        {{ item.label }}
      </div>

      <div
        ref="currentItemBgRef"
        class="
          w-70px h-28px
          absolute top-0 left-0 z-0
          pointer-events-none
          transition-transform
          duration-300
          ease-in-out
          translate-x-8px
          translate-y-5px
          -z-1
        "
      >
        <div class="animate-dom animate-jello w-full h-full">
          &nbsp;
        </div>
      </div>
    </div>
    <div class="w-40px h-0px md:h-40px" />
  </div>
</template>

<style scoped>
#nav-bg {
  will-change: opacity,transform;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  box-shadow: 0 0 transparent, 0 0 transparent, var(--header-avatar-shadow);

  /* 下面这个是上下渐变 */
  background: linear-gradient(to bottom,var(--background),transparent);
  /* 加上下面这个是设置渐变毛玻璃 */
  /* background: red;
  mask-image: linear-gradient(to top, transparent, #000);
  -webkit-mask-image: linear-gradient(to top, transparent, #000); */
}

@media (min-width: 768px) {
  #nav-bg {
    height: 80px;
  }
}
.nav-filter{
  position: relative;
  background: var(--nav-bg);
  border: 2px solid var(--nav-border);
  border-radius: 23px;
  display: flex;
  font-family: "Silka Medium";
  font-size: 14px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.filter-option{
  width: 80px;
  height: 28px;
  line-height: 28px;
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

.animate-dom{
  border-radius: 50px;
  background-color: var(--nav-placeholder-bg);
}
.animate-jello {
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
</style>
