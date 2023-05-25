<script setup lang="ts">
definePageMeta({
  layout: 'none',
})
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const route = useRoute()
const currentBlog = reactive({
  index: 0,
  title: '第11期 - 贴玻璃膜',
  desc: '贴玻璃膜',
  date: '2021-10-01',
  tags: ['Develop'],
  link: '/blog/01',
  path: '/01',
  prevPath: '',
  nextPath: '',
})
if (route.query.blog) {
  currentBlog.path = `/${route.query.blog}` as string
  const blogs = await queryContent(currentBlog.path).find()
  blogs.length && parseCurrentBlog(blogs[0])
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
    prevPath: index - 1 >= 0 ? allBlogs[index - 1]?._path : '',
    nextPath: index + 1 < allBlogs.length ? allBlogs[index + 1]?._path : '',
  }
}
</script>

<template>
  <main>
    <div class="doc-container pb-20 heti">
      <h1 class="content-title flex align-middle ">
        {{ currentBlog.title }}
      </h1>
      <ContentDoc :path="currentBlog.path">
        <template #not-found>
          <h1>Document not found</h1>
        </template>
      </ContentDoc>

      <hr>

      <div class="flex justify-between md:flex-row flex-col mt-2 post-footer">
        <div class="flex-1">
          发布日期：<a href="https://github.com/" target="_blank" title="Edit">{{ currentBlog.date }}</a>
        </div>
        <div class="md:mt-0 mt-4 flex-1 text-right">
          <a v-if="currentBlog.prevPath" href="https://github.com/">上一篇 |</a>
          <a v-if="currentBlog.nextPath" href="https://github.com/">下一篇 |</a>
          <a href="/">去首页 |</a>
          <a href="https://github.com/" target="_blank" title="Follow">Twitter</a>
          <a href="https://github.com/" title="Star" target="_blank" class="lg:inline-block hidden"> | Github</a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}
.doc-container{
  max-width: 50rem;
}
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
