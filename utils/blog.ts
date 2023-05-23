// 转化成标题
export function parseTitle(oldTitle: string) {
  let title = `第${oldTitle.split('-')[0]}期 - ${oldTitle.split('-')[1]}`
  if (title.slice(-1) === '/')
    title = title.substring(0, title.length - 1)

  const regex = /^.*(?=\.md)/
  const result = title.match(regex)![0]
  return result
}

// 转化文章路由地址
export function parseLinkToRoute(oldTitle: string) {
  const index = parseInt(oldTitle.split('-')[0])
  const linkNum = index > 9 ? `${index}` : `0${index}`
  const path = `blog/content/?blog=${linkNum}`
  return path
}

// 获取当前文章的序号
export function getIndex(oldTitle: string) {
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
