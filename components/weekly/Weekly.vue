<script setup lang="ts">
</script>

<template>
  <div class="select-none  bg-gray-300">
    <!-- <img class="image pointer-events-none rounded-md overflow-hidden" src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230405174353.png" alt=""> -->
    <div class=" pointer">
      Weekly
    </div>
  </div>
</template>

<style scoped>
.image{
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow-clip-margin: content-box;
    overflow: clip;
    cursor: pointer;
}
.pointer{
  height: 40px;
  background: hsl(0 0% 95.1%);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: hsl(0 0% 43.5%);
  margin-top: 4px;
  display: flex;
  gap: 4px;
  transition: background 150ms ease 0s, color 150ms ease 0s;
}
</style>
