<script setup lang="ts">

</script>

<template>
  <div id="nav-bg" class="flex justify-start flex-row items-center" style="transform: translate3d(0px, 0px, 0px);">
    <img class="w-56px h-56px" src="/logo.svg" alt="">
  </div>
</template>

<style scoped>
#nav-bg {
  padding: 0 1.5rem;
  position: fixed;
  z-index: 9993;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  will-change: opacity,transform;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  box-shadow: 0 0 transparent, 0 0 transparent, var(--header-avatar-shadow);
  /* 加上下面这个是设置渐变毛玻璃 */
  /* background: red;
  mask-image: linear-gradient(to top, transparent, #000);
  -webkit-mask-image: linear-gradient(to top, transparent, #000); */
}

@media (min-width: 768px) {
  #nav-bg {
    height: 70px;
  }
}
</style>
