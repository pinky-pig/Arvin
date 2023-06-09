<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { appHeadTitle, setAppHeadTitle } = useAppHead()
setAppHeadTitle(route.query.blog as string)
useHead({
  title: appHeadTitle,
})

const navigation = await queryContent('/').only(['_file', 'title', 'desc', 'date', 'tags', '_path']).find()

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

onActivated(() => {
  initCurrentBlog(route.query.blog as string)
})
onMounted(() => {
  initCurrentBlog(route.query.blog as string)
})

async function initCurrentBlog(blog: string) {
  if (blog) {
    currentBlog.path = blog.includes('/') ? blog : `/${blog}`
    const blogs = await queryContent(currentBlog.path).find()
    blogs.length && parseCurrentBlog(blogs[0])
  }
  scrollToBlogTop()
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
    class="mx-auto max-w-872px w-full flex rounded-xl bg-transparent px-2 pt-10px text-start md:bg-[var(--blog-bg)] md:p-4 md:px-36px"
  >
    <div class="heti max-w-50rem w-full flex-shrink-0 flex-grow-0 p-[0.8rem,2rem,4rem] pb-20">
      <h1 class="content-title flex align-middle">
        {{ currentBlog.title || ' ' }}
      </h1>

      <ClientOnly>
        <ContentDoc :path="currentBlog.path">
          <template #not-found>
            <h1>Loading</h1>
          </template>
        </ContentDoc>
      </ClientOnly>

      <hr>

      <div class="post-footer mt-2 flex flex-col items-center justify-between md:flex-row">
        <div class="flex-1">
          发布日期：<a href="https://github.com/" target="_blank" title="Edit">{{ currentBlog.date }}</a>
        </div>
        <div class="mt-4 flex-1 text-right md:mt-0">
          <a v-if="currentBlog.prevPath" @click="paginationJump(currentBlog.prevPath)">上一篇 |</a>
          <a v-if="currentBlog.nextPath" @click="paginationJump(currentBlog.nextPath)">下一篇 |</a>
          <a @click="router.push(`/blog`)">去首页 |</a>
          <a href="https://github.com/" target="_blank" title="Follow">Twitter</a>
          <a href="https://github.com/" title="Star" target="_blank" class="hidden lg:inline-block"> | Github</a>
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
</style>
