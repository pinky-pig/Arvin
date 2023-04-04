<template>
  <div
    id="foot"
    text="xl gray4"
    flex
    py-5
    justify-center
    gap-3
  >
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/pinky-pig" target="_blank" />
    <DarkToggle />
  </div>
</template>

<style scoped>
#foot{
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
