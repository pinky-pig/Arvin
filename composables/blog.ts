import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IBlog } from '~/config/types'

export const useBlogStore = defineStore('blog', async () => {
  const allBlog = ref<IBlog[]>([])
  const navigationBlog = ref<any[]>([])
  const currentBlog = ref(null)

  return {
    navigationBlog,
    allBlog,
    currentBlog,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot))
