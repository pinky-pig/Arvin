/**
 * 使用 view-transition API 切换主题
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
 * @param event 鼠标事件，用于动画的起始位置
 */
export function useToggleTheme(event: MouseEvent, duration = 1000) {
  // 1. 计算动画的结束半径
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // 2. 切换主题
  let isDark: boolean
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const transition = document.startViewTransition(() => {
    const root = document.documentElement
    isDark = root.classList.contains('dark')
    root.classList.remove(isDark ? 'dark' : 'light')
    root.classList.add(isDark ? 'light' : 'dark')
  })

  // 3. 执行动画
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration,
        easing: 'ease-in',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
  addToggleThemeCss()
}

function addToggleThemeCss() {
  const css = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }

    /* 进入dark模式和退出dark模式时，两个图像的位置顺序正好相反 */
    .dark::view-transition-old(root) {
      z-index: 1;
    }
    .dark::view-transition-new(root) {
      z-index: 999;
    }

    ::view-transition-old(root) {
      z-index: 999;
    }
    ::view-transition-new(root) {
      z-index: 1;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.textContent = css
  document.getElementsByTagName('HEAD')!.item(0)!.appendChild(style)
}
