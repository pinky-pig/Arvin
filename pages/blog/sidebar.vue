<script setup lang="ts">
import { SITE } from '~/config/param'
import type { IBlog } from '~/config/types'

const props = defineProps({
  currentBlog: {
    type: Object as PropType<IBlog>,
    required: true,
  },
})
const emit = defineEmits(['blogJump'])

const router = useRouter()

const allBlogs = ref<IBlog[]>()
allBlogs.value = await parseList()
</script>

<template>
  <nav class="w-300px h-full pl-4 ">
    <div class="flex flex-row leading-40px text-2rem font-bold gap-2 my-2 pt-10px">
      <img class="w-40px h-40px cursor-pointer" :src="SITE.icon" alt="" @click="router.push(`/blog`)">
      <h1 class="cursor-pointer" @click="router.push(`/blog`)">
        {{ SITE.title }}
      </h1>
    </div>

    <ul class="mt-20px">
      <li
        v-for="item, index in allBlogs"
        :key="index"
        :class="props.currentBlog.index === item.index ? 'font-bold' : ''"
        class="leading-6 text-1.08rem px-0.3rem py-0.7rem m-1px cursor-pointer hover:font-bold"
      >
        <div class="nav-group">
          <ul>
            <li class="nav-link" @click="emit('blogJump', item.link)">
              {{ item.title }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
