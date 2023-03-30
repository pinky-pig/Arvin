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
}

@media (min-width: 768px) {
  #nav-bg {
    height: 108px;
  }
}
</style>
