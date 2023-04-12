<script setup lang="ts">
const color = useColorMode()
// https://arvin-weekly.netlify.app/
</script>

<template>
  <div class="relative select-none bg-[var(--card--bg)] overflow-hidden">
    <img class="select-none pointer-events-none" :style="{ opacity: color.value === 'dark' ? 0 : 1 }" src="https://nevflynn.com/images/wrap-bg.svg" alt="">
    <img
      class="
        object-fill
        select-none
        pointer-events-none
        absolute
        left-0
        top-0
      "
      src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230406143158.png"
      style="transform: rotate(330deg) translate3d(100px, 10px, 10px);"
      alt=""
    >

    <a class="detail-arrow" href="https://weekly.mmeme.me/" target="_blank">
      <div class="w-16px h-16px" i-carbon-arrow-up-right />
    </a>
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
