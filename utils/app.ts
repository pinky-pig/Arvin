import { SITE } from '~/config'

export function AppSetup() {
  // vue transition bug handle
  // other solution
  // <NuxtPage :key="$route.fullPath" />
  const messages = [
    'Uncaught NotFoundError: Failed to execute \'insertBefore\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.', // chromium based
    'NotFoundError: The object can not be found here.', // safari
  ]
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (ev) => {
      if (messages.includes(ev.message)) {
        ev.preventDefault()
        window.location.reload()
      }
    })
  }

  onMounted(() => {
    // eslint-disable-next-line no-console
    console.log(SITE.consoleColorFulOutput, 'color: #ffffff; background-color: #0D1117; padding: 0.2rem 0.3rem;font-size: 1rem;font-weight: 600;')
  })

  // registerLozad()
  registerHeti()
}
