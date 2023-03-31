<script setup lang="ts">

</script>

<template>
  <div id="nav-bg" style="transform: translate3d(0px, 0px, 0px);" />
</template>

<style scoped>
#nav-bg {
  position: fixed;
  z-index: 9993;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  will-change: opacity,transform;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(8px);
  box-shadow: 0 0 transparent, 0 0 transparent, var(--header-border-shadow);
  /* 加上下面这个是设置渐变毛玻璃 */
  /* background: red;
  mask-image: linear-gradient(to top, transparent, #000);
  -webkit-mask-image: linear-gradient(to top, transparent, #000); */
}

@media (min-width: 768px) {
  #nav-bg {
    height: 108px;
  }
}
</style>
