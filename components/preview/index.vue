<script setup lang="ts">
const router = useRouter()
function toPreview() {
  router.push('/preview')
}
</script>

<template>
  <div class="parent-rain-node relative select-none bg-[var(--card--bg)] overflow-hidden">
    <div class="overflow-hidden pointer-events-none">
      <div>preview</div>
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
