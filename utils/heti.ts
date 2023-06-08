export async function registerHeti() {
  // 字体间距优化
  useScriptTag(
    'https://gw.alipayobjects.com/os/k/h3/heti-addon.min.js',
    (el: HTMLScriptElement) => {
      const heti = new (window as any).Heti('.heti')
      heti.autoSpacing()
    },
  )
}
