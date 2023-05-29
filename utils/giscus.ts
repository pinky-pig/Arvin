export function registerGiscus() {
  const root = ref<HTMLElement>()
  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'pinky-pig/Arvin')
    script.setAttribute('data-repo-id', 'R_kgDOJI00wg')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOJI00ws4CWzuK')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'https://gw.alipayobjects.com/os/k/font7/comment.css')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', '')
    root.value!.appendChild(script)
  })
  return { root }
}

function updateGiscusConfig(config: object) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe)
    return
  iframe.contentWindow!.postMessage({
    giscus: {
      setConfig: config,
    },
  }, 'https://giscus.app')
}
