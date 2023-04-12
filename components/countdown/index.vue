<script setup lang="ts">
import { countdownTime } from './helper'

const time = ref(countdownTime()) // 23.84

function runAtMidnight(callback: Function) {
  const now = Date.now()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  let tomorrow = midnight.getTime() - now
  setInterval(() => {
    const now = Date.now()
    if (now >= midnight.getTime()) {
      callback()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      tomorrow = midnight.getTime() - now
    }
  }, 1000)
}

runAtMidnight(() => {
  time.value = countdownTime()
})
</script>

<template>
  <Card>{{ time }}</Card>
</template>

<style scoped>

</style>
