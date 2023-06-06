<script setup lang="ts">
import LeftSidebar from './sidebar.vue'

const route = useRoute()
const router = useRouter()
const { appHeadTitle, setAppHeadTitle } = useAppHead()
setAppHeadTitle(route.query.blog as string)
useHead({
  title: appHeadTitle,
})

const navigation = await queryContent('/').only(['_file', 'title', 'desc', 'date', 'tags']).find()

const { root: giscusRoot } = registerGiscus()

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

initCurrentBlog(route.query.blog as string)

async function initCurrentBlog(blog: string) {
  if (blog) {
    currentBlog.path = blog.includes('/') ? blog : `/${blog}`
    const blogs = await queryContent(currentBlog.path).find()
    blogs.length && parseCurrentBlog(blogs[0])
  }
  // scrollToBlogTop()
}

function parseCurrentBlog(blog: any) {
  currentBlog.index = getIndex(blog._file)
  currentBlog.title = parseTitle(blog._file)
  currentBlog.link = parseLinkToRoute(blog._file)
  currentBlog.desc = blog.desc
  currentBlog.date = blog.date
  currentBlog.tags = blog.tags
  const { prevPath, nextPath } = parsePreAndNextLink(navigation as any[], currentBlog)
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
  router.replace({ query: { blog: path } })
  initCurrentBlog(path)
  updateGiscusConfig({
    setConfig: {
      reactionsEnabled: false,
      term: path.slice(1) || '01',
    },
  })
}
</script>

<template>
  <main
    class="layout flex justify-center p-2 md:p-4 bg-[var(--blog-bg)]"
  >
    <aside id="grid-left" class="grid-sidebar hidden md:block flex-shrink-0 flex-grow-0">
      <LeftSidebar
        :current-blog="currentBlog"
        class="fixed"
        @blogJump="paginationJump"
      />
    </aside>

    <div id="grid-main" class="heti max-w-50rem pb-20  w-[calc(100vw-0.8rem)] md:w-unset p-[0.8rem,2rem,4rem] flex-shrink-0 flex-grow-0">
      <h1 class="content-title flex align-middle ">
        {{ currentBlog.title || ' ' }}
      </h1>

      <ClientOnly>
        <ContentDoc :path="currentBlog.path">
          <template #not-found>
            <h1>Document not found</h1>
          </template>
        </ContentDoc>
      </ClientOnly>

      <hr>

      <div class="flex justify-between items-center md:flex-row flex-col mt-2 post-footer">
        <div class="flex-1">
          发布日期：<a href="https://github.com/" target="_blank" title="Edit">{{ currentBlog.date }}</a>
        </div>
        <div class="md:mt-0 mt-4 flex-1 text-right">
          <a v-if="currentBlog.prevPath" @click="paginationJump(currentBlog.prevPath)">上一篇 |</a>
          <a v-if="currentBlog.nextPath" @click="paginationJump(currentBlog.nextPath)">下一篇 |</a>
          <a @click="router.push(`/blog`)">去首页 |</a>
          <a href="https://github.com/" target="_blank" title="Follow">Twitter</a>
          <a href="https://github.com/" title="Star" target="_blank" class="lg:inline-block hidden"> | Github</a>
        </div>
      </div>

      <hr>

      <div ref="giscusRoot" />
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

.layout {
  display: grid;
  grid-auto-flow: column;
  overflow-x: hidden;
}

.grid-sidebar {
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 0;
  margin-left: -5px;
}
#grid-left {
  position: fixed;
  z-index: 10;
  display: none;
}
#grid-main {
  padding: 0.8rem 0.5rem 4rem 0.5rem;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (min-width: 50em) {
  .layout {
    overflow: initial;
    grid-template-columns: 18rem minmax(0, 54em);
    gap: 0;
  }

  #grid-main {
    padding: 0.8rem 2rem 4rem 2rem;
  }

  #grid-left {
    display: flex;
    padding-left: 2rem;
    position: sticky;
    grid-column: 1;
  }
}
</style>
