/* eslint-disable @typescript-eslint/ban-ts-comment */
import { setup } from '@css-render/vue3-ssr'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server && nuxtApp.ssrContext) {
    const { collect } = setup(nuxtApp.vueApp || {})
    // @ts-expect-error
    const originalRender = nuxtApp.ssrContext.renderMeta.bind(nuxtApp.ssrContext)
    nuxtApp.ssrContext.renderMeta = () => {
      // @ts-expect-error
      const result = originalRender()
      // @ts-expect-error
      // eslint-disable-next-line no-mixed-operators
      const headTags = result && result.headTags ? result.headTags : ''
      return {
        headTags: headTags + collect(),
      }
    }
  }
})
