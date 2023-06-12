<script setup lang="ts">
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

function countdownTime() {
  // 获取今年的年份
  const year = new Date().getFullYear()

  // 判断今年是否为闰年，计算今年的总天数
  const daysInYear = new Date(year, 2, 0).getDate() === 29 ? 366 : 365

  // 获取今天是今年的第几天
  const today = Math.floor((new Date().getTime() - new Date(year, 0, 0).getTime()) / 86400000)

  // 计算今年已经过去了多少天
  const daysGone = today + 1

  // 计算已经过去的百分比
  const percentage = ((daysGone / daysInYear) * 100).toFixed(2)

  return percentage
}
</script>

<template>
  <BentoWrapperCard>{{ time }}</BentoWrapperCard>
</template>

<style scoped>

</style>
