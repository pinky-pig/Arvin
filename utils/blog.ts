// 转化成标题
export function parseTitle(currentPage: string) {
  const oldTitle = decodeURIComponent(currentPage.split('/posts/')[1])
  let title = `第${oldTitle.split('-')[0]}期 - ${oldTitle.split('-')[1]}`
  if (title.slice(-1) === '/')
    title = title.substring(0, title.length - 1)

  return title
}

// 获取当前文章的序号
export function getIndex(currentPage: string) {
  const oldTitle = decodeURIComponent(currentPage.split('/posts/')[1])
  return parseInt(oldTitle.split('-')[0])
}

// 排序所有的文章
export function sortPosts(allPosts: any) {
  return allPosts.sort((a: { url: string }, b: { url: string }) => {
    return (
      parseInt(b.url.split('/posts/')[1].split('-')[0])
      - parseInt(a.url.split('/posts/')[1].split('-')[0])
    )
  })
}
