<script setup lang="ts">
const navFilter = [
  { label: '项目', route: '/' },
  { label: '文章', route: '/blog' },
  { label: '归档', route: '/archives' },
]

const route = useRoute()
const { appHeadTitle, setAppHeadTitle } = useAppHead()

useHead({
  title: appHeadTitle,
})

const currentItem = ref<typeof navFilter[0] | null>(null)
const currentItemBgRef = ref<HTMLElement>()
// 选中当前选项卡
function handleActiveTab(item: typeof navFilter[0], index: number) {
  const animateDom = document.querySelectorAll('.animate-dom')[0] as HTMLElement
  animateDom.classList.remove('animate-jello')
  currentItem.value = item
  currentItemBgRef.value!.style.transform = `translate(${(document.querySelectorAll('.filter-option')[index] as HTMLElement).offsetLeft + 5}px, 5px)`
  animateDom.classList.add('animate-jello')
  setAppHeadTitle(item.label)
}

onMounted(() => {
  initActiveTab()
})

watch(
  () => route.fullPath,
  () => {
    initActiveTab()
  },
)

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
      h-180px
      flex flex-col justify-between items-center
      md:flex-row
    "
  >
    <img
      class="w-72px h-72px mt-18px md:w-56px md:h-56px md:mt-0"
      src="/logo.svg"
      alt=""
    >

    <div class="nav-filter">
      <NuxtLink
        v-for="item, index in navFilter"
        :key="item.label"
        :to="item.route"
        class="filter-option "
        @click="handleActiveTab(item, index)"
      >
        {{ item.label }}
      </NuxtLink>

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
  padding: 0 3.5vw;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  will-change: opacity,transform;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  /* box-shadow: 0 0 transparent, 0 0 transparent, var(--header-avatar-shadow); */

  /* 下面这个是上下渐变 */
  background: linear-gradient(to bottom,var(--background),transparent);
  /* 加上下面这个是设置渐变毛玻璃 */
  /* background: red;
  mask-image: linear-gradient(to top, transparent, #000);
  -webkit-mask-image: linear-gradient(to top, transparent, #000); */
}

@media (min-width: 768px) {
  #nav-bg {
    height: 136px;
  }
}
.nav-filter{
  position: relative;
  background: transparent;
  border: 2px solid var(--nav-placeholder-bg);
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
  color: var(--nav-text);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  user-select: none;
}
.animate-dom{
  border-radius: 50px;
  background-color: var(--nav-placeholder-bg);
  color: var(--nav-text);
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
