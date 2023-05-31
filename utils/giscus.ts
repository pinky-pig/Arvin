interface ISetConfigMessage {
  setConfig: {
    theme?: any
    repo?: string
    repoId?: string
    category?: string
    categoryId?: string
    term?: string
    description?: string
    backLink?: string
    number?: number
    strict?: boolean
    reactionsEnabled?: boolean
    emitMetadata?: boolean
    inputPosition?: any
    lang?: any
  }
}

function getTheme() {
  const color = useColorMode()
  if (color.value === 'dark')
    return 'https://giscus.app/themes/custom_example.css'
  else
    return 'https://gw.alipayobjects.com/os/k/font7/comment.css'
}

export function registerGiscus() {
  const root = ref<HTMLElement | null>()
  onMounted(() => {
    const giscusFrame = document.getElementById('giscus-frame')
    if (giscusFrame) {
      return null
    }
    else {
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.setAttribute('data-repo', 'pinky-pig/Arvin')
      script.setAttribute('data-repo-id', 'R_kgDOJI00wg')
      script.setAttribute('data-category', 'General')
      script.setAttribute('data-category-id', 'DIC_kwDOJI00ws4CWzuK')
      script.setAttribute('data-mapping', 'title')
      script.setAttribute('data-strict', '0')
      script.setAttribute('data-reactions-enabled', '1')
      script.setAttribute('data-emit-metadata', '0')
      script.setAttribute('data-input-position', 'bottom')
      script.setAttribute('data-theme', getTheme())
      script.setAttribute('data-lang', 'zh-CN')
      script.setAttribute('data-loading', 'lazy')
      script.setAttribute('crossorigin', 'anonymous')
      script.setAttribute('async', '')
      root.value!.appendChild(script)
    }
  })
  updateGiscusTheme()
  return { root }
}

export function updateGiscusConfig(message: ISetConfigMessage) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  if (!iframe)
    return
  iframe.contentWindow!.postMessage({ giscus: message }, 'https://giscus.app')
}

export function updateGiscusTheme() {
  const color = useColorMode()

  watch(color, (newVal, oldVal) => {
    if (color.value === 'dark') {
      updateGiscusConfig({
        setConfig: {
          theme: 'https://giscus.app/themes/custom_example.css',
        },
      })
    }
    else {
      updateGiscusConfig({
        setConfig: {
          theme: 'https://gw.alipayobjects.com/os/k/font7/comment.css',
        },
      })
    }
  })
}
