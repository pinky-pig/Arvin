import { appDescription, appName } from '~/config'

export function useAppHead() {
  const appHeadTitle = useState('appHeadTitle', () => appName)
  const appHeadDescription = useState('appHeadDescription', () => appDescription)

  function setAppHeadTitle(title: string) {
    appHeadTitle.value = title
  }
  function setAppHeadDescription(description: string) {
    appHeadDescription.value = description
  }

  return {
    appHeadTitle,
    appHeadDescription,
    setAppHeadTitle,
    setAppHeadDescription,
  }
}
