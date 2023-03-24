<script setup lang="ts">
import Bento from '~/components/bento3/index.vue'

const print = (val: string, e: any) => {
  // eslint-disable-next-line no-console
  console.log(val, e)
}
</script>

<template>
  <Bento
    @drag-start="print('drag-start', $event)"
    @drag-end="print('drag-end', $event)"
  />
</template>
