<script setup lang="ts">
const router = useRouter()
function toPreview() {
  router.push('/preview')
}
</script>

<template>
  <div
    class="relative select-none bg-[var(--card--bg)] overflow-hidden "
  >
    <div class="absolute top-1/3 left-1/2 -translate-1/2 h-40px pointer-events-auto ">
      <n-space>
        <n-popover :width="300" trigger="hover" :show-arrow="false">
          <template #trigger>
            <span class="underline underline-light-50 underline-offset-8px cursor-pointer hover:text-#fff">
              预览网站
            </span>
          </template>
          <img src="https://dev.mmeme.me/static/screenshots/previewSite.jpeg" alt="">
        </n-popover>
      </n-space>
    </div>

    <button class="detail-arrow" @click="toPreview">
      <div class="w-16px h-16px" i-carbon-arrow-up-right />
    </button>
  </div>
</template>

<style scoped>
.detail-arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  position: absolute;
  left: 12px;
  bottom: 10px;
  color: var(--text-color);
  border-radius: 18px;
  background: var(--card--bg);
  box-shadow: var(--card--border) 0px 0px 0px 2px;
  transition: box-shadow 0.2s ease-out 0s;
}

.detail-arrow:hover{
  cursor: pointer;
  box-shadow: var(--card--border) 0px 0px 0px 5px;
}
</style>
