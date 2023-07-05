export async function registerHeti() {
  // 字体间距优化
  useScriptTag(
    '/heti-addon.min.js',
    (el: HTMLScriptElement) => {
      const heti = new (window as any).Heti('.heti')
      heti.autoSpacing()
    },
  )
}
