<script setup lang="ts">
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mx-auto max-w-970px justify-center gap-10px rounded-xl px-5px text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-25px">
          <BlogList />
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
