<script setup lang="ts">
definePageMeta({
  title: 'Preview',
  subtitle: '预览网站Url',
  key: route => route.fullPath,
  keepalive: true,
})

const router = useRouter()
const bubbleCardRef = ref<HTMLElement | null>(null)
function toHome() {
  bubbleCardRef.value && (bubbleCardRef.value as any).bubble(1)

  setTimeout(() => {
    router.push('/')
  }, 600)
}

const website = ref('https://www.mmeme.me/')
const imageUrl = ref('')
const title = ref('')
const showImage = ref(false)
const loadingImage = ref(false)

async function handleLoadImage() {
  loadingImage.value = true
  const { data, pending, error, refresh, execute }
    = await useFetch(
      'https://dev.mmeme.me/api/preview/site',
      // 'http://localhost:3200/preview/site',
      { query: { url: website.value || 'https://www.mmeme.me/' } },
    )

  if (data.value) {
    const response = JSON.parse((data.value as any).body)
    title.value = response?.page?.title
    showImage.value = false
    nextTick(() => {
      imageUrl.value = response.page.path || ''
      showImage.value = true
      loadingImage.value = false
    })
  }
}
</script>

<template>
  <BubbleCard ref="bubbleCardRef" :has-animation="true">
    <template #icon>
      <div class="return-arrow" @click="toHome">
        <div i-carbon:direction-loop-left />
      </div>
    </template>
    <template #title>
      Preview Site
    </template>

    <template #operate-button>
      <DarkToggle />
    </template>

    <div
      class="
        mapbox-container
        bg-[var(--card--placeholder-bg)]
        w-full h-full
        flex items-center flex-col gap-40px
        rounded-3xl
        pt-100px px-40px
      "
    >
      <div class="flex flex-row px-20px">
        <input
          v-model="website"
          type="text"
          class="
            max-w-300px h-10 px-3
            relative
            text-sm font-semibold leading-normal bg-[var(--second-color)]
            rounded rounded-r-none
            focus:outline-none
          "
          placeholder="https://www.mmeme.me/"
        >
        <LoadingButton
          class="w-100px h-40px rounded-l-0"
          normal-text="Preview"
          :has-animation="loadingImage"
          @click="handleLoadImage"
        >
          Preview
        </LoadingButton>
      </div>
      <div v-if="showImage">
        <img
          class="rounded-lg"
          :src="imageUrl"
          alt="Preview Image"
        >
      </div>
      <div v-else class="max-w-650px w-full h-350px bg-[var(--second-color)] rounded-lg flex justify-center items-center">
        ...
      </div>
    </div>
  </BubbleCard>
</template>

<style scoped>
.map{
  transform: translateY(0); /* ios map 圆角 不生效解决方案 */
  overflow: hidden;
  background-color: var(--card--bg);
  border-color: var(--card--border);
  border-width: 2px;
  border-style: solid;
}
.return-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  border-radius: 18px;
  color: var(--text-color);
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}
.return-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
.bottom{
  position: fixed;
  bottom: 30px;
  left: 0px;
  width: 100%;
}
.menu{
  position: fixed;
  bottom: 120px;
  left: 30px;
  width: 300px;
  height: 200px;
  background: var(--dockbar-placeholder-bg);
  border-radius: 20px;
}
</style>
