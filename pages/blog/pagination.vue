<script setup lang="ts">
const props = defineProps({
  page: {
    type: Object as PropType<{
      prev?: string
      next?: string
      total: number
      current: number
    }>,
    required: true,
  },

})

function createPagerUrl(current: number, total: number) {
  const prev
    = current === 1 ? undefined : `/blog/${current === 2 ? '' : current - 1}`
  const next = current === total ? undefined : `/blog/${current + 1}`
  return { prev, next }
}

const { prev, next } = createPagerUrl(props.page.current, props.page.total)
</script>

<template>
  <div class="pt-6 pb-8 text-sm">
    <nav class="flex justify-between">
      <a
        aria-label="Prev page"
        class="flex items-center cursor-pointer"
        :class="!!prev ? 'hover:underline' : 'op-30'"
      >
        <div class="i-ri:arrow-left-double-line" />
        <span>Prev</span>
      </a>
      <span>
        {{ props.page.current }}/{{ props.page.total }}
      </span>
      <a
        aria-label="Next page"
        class="flex items-center cursor-pointer"
        :class="!!next ? 'hover:underline' : 'op-30'"
      >
        <span>Next</span>
        <div class="i-ri:arrow-right-double-line" />
      </a>
    </nav>
  </div>
</template>

<style scoped>

</style>
