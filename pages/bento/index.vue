<script setup lang="ts">
import Bento from '~/components/bento3/index.vue'

const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
</script>

<template>
  <Bento
    class="bento-container"
    :size="200"
    :gap="10"
    :maximum-cells="4"
    @drag-start="print('drag-start', $event)"
    @drag-end="print('drag-end', $event)"
  />
</template>

<style scoped>
.bento-container{
  position: relative;
  touch-action:none;
  height: 60vh;
  width: 80vw;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>
