export async function registerGiscus() {
  // 如果有 giscus 的 script 标签，就不再注册
  // if (document.getElementById('giscus-script')) return

  const { scriptTag, load, unload } = useScriptTag(
    'https://giscus.app/client.js',
    () => { },
    {
      manual: true,
      async: true,
      crossOrigin: 'anonymous',
      attrs: {
        'data-repo': 'pinky-pig/Arvin',
        'data-repo-id': 'R_kgDOJI00wg',
        'data-category': 'General',
        'data-category-id': 'DIC_kwDOJI00ws4CWzuK',
        'data-mapping': 'title',
        'data-strict': '0',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'bottom',
        'data-theme': 'https://gw.alipayobjects.com/os/k/font7/comment.css',
        'data-lang': 'zh-CN',
      },
    },
  )

  await load()
}
