<script setup lang="ts">

</script>

<template>
  <a
    href="{post.url}"
    class="pb-3 md:mt-5 mt-4 md:mr-5 flex flex-col justify-center rounded-3xl shadow-md overflow-hidden mx-auto md:w-80 w-90"
  >
    <div class="lozad block md:w-80 md:h-48 w-96 h-52 rounded-t-3xl" style="background: linear-gradient(to bottom, #ece9e6, #ffffff);" />
    <div class="w-full flex justify-between items-center leading-tight pt-4 pl-3 pr-3">
      <div class="text-gray-800">{title}</div>
      <div class="text-grey-darker text-sm text-gray-600">{date}</div>
    </div>
    <p class="text-gray-600 text-sm md:w-78 w-94 overflow-hidden pt-2.5 line-clamp-2 px-3 w-full h-12">
      {desc}
    </p>
  </a>
</template>

<style scoped>
</style>
