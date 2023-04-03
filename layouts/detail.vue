<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <main class="py-10 px-10 text-center max-w-720px mx-auto">
    <div class=" flex flex-col gap-8">
      <!-- 页头 - 返回按钮 -->
      <nav class="py-3 px-8 font-medium bg-gray-200 text-black">
        <div class="flex gap-2 items-center justify-between">
          <NuxtLink class="flex flex-row gap-3 items-center cursor-pointer" to="/">
            <div i-carbon:direction-loop-left />
            <p>Arvin</p>
          </NuxtLink>
        </div>
      </nav>

      <!-- 页面 -->
      <slot />
      <!-- 页脚 -->
      <hr class="mt-40px h-1px border-0 bg-#cacaca">
    </div>
  </main>
</template>
