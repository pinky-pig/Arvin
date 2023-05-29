<script setup lang="ts">
import LeftSidebar from './sidebar.vue'

definePageMeta({
  layout: 'none',
})

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const route = useRoute()
const router = useRouter()
const currentBlog = reactive({
  index: 0,
  title: '',
  desc: '',
  date: '',
  tags: [],
  link: '',
  path: '',
  prevPath: '',
  nextPath: '',
})

initCurrentBlog(route.query.url as string)

async function initCurrentBlog(blog: string) {
  if (blog) {
    currentBlog.path = blog.includes('/') ? blog : `/${blog}`
    const blogs = await queryContent(currentBlog.path).find()
    blogs.length && parseCurrentBlog(blogs[0])
  }
}

function parseCurrentBlog(blog: any) {
  currentBlog.index = getIndex(blog._file)
  currentBlog.title = parseTitle(blog._file)
  currentBlog.link = parseLinkToRoute(blog._file)
  currentBlog.desc = blog.desc
  currentBlog.date = blog.date
  currentBlog.tags = blog.tags
  const { prevPath, nextPath } = parsePreAndNextLink(navigation.value as any[], currentBlog)
  currentBlog.prevPath = prevPath
  currentBlog.nextPath = nextPath
}

function parsePreAndNextLink(allBlogs: any[], currentBlog: any) {
  const index = allBlogs.findIndex(blog => blog._path === currentBlog.path)

  return {
    prevPath: index - 1 >= 0 ? allBlogs[index - 1]._path : '',
    nextPath: index + 1 < allBlogs.length ? allBlogs[index + 1]._path : '',
  }
}

function paginationJump(path: string) {
  router.replace({ query: { url: path } })
  initCurrentBlog(path)
}
</script>

<template>
  <main class="flex p-4 justify-center items-center">
    <div class="relative">
      <aside class="hidden md:block flex-shrink-0 flex-grow-0">
        <LeftSidebar
          :current-blog="currentBlog"
          class="fixed"
          @blogJump="paginationJump"
        />
      </aside>

      <div class="heti max-w-50rem w-50rem pb-20 p-0 md:ml-300px md:p-[0.8rem,2rem,4rem] flex-shrink-0 flex-grow-0">
        <h1 class="content-title flex align-middle ">
          {{ currentBlog.title }}
        </h1>

        <ContentDoc :path="currentBlog.path">
          <template #not-found>
            <h1>Document not found</h1>
          </template>
        </ContentDoc>

        <hr>

        <div class="flex justify-between items-center md:flex-row flex-col mt-2 post-footer">
          <div class="flex-1">
            发布日期：<a href="https://github.com/" target="_blank" title="Edit">{{ currentBlog.date }}</a>
          </div>
          <div class="md:mt-0 mt-4 flex-1 text-right">
            <a v-if="currentBlog.prevPath" @click="paginationJump(currentBlog.prevPath)">上一篇 |</a>
            <a v-if="currentBlog.nextPath" @click="paginationJump(currentBlog.nextPath)">下一篇 |</a>
            <a href="/">去首页 |</a>
            <a href="https://github.com/" target="_blank" title="Follow">Twitter</a>
            <a href="https://github.com/" title="Star" target="_blank" class="lg:inline-block hidden"> | Github</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.heti h1.content-title:first-child {
  margin-block-start: 8px !important;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

@media (max-width: 50em) {
  .heti h1.content-title:first-child {
    margin-bottom: 2.3rem;
    font-size: 1.8rem;
  }
}
</style>