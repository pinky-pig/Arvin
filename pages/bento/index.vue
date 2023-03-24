<script setup lang="ts">
import Bento from '~/components/bento3/index.vue'

const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
</script>

<template>
  <div class="container">
    <Bento
      class="bento-container"
      :size="100"
      :gap="10"
      :maximum-cells="4"
      @drag-start="print('drag-start', $event)"
      @drag-end="print('drag-end', $event)"
    />
  </div>
</template>

<style scoped>
.container {
  height: 60vh;
  width: 80vw;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  place-items: center;
}
.bento-container{
  border: 1px solid rgb(176, 108, 108);
  margin-left: auto;
  margin-right: auto;
}
</style>
