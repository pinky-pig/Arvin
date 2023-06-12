import { markRaw } from 'vue'
import BentoProfile from '~/components/Bento/Profile.vue'
import BentoWeekly from '~/components/Bento/Weekly.vue'

import BentoMapbox from '~/components/Bento/Mapbox.vue'
import BentoCountDown from '~/components/Bento/CountDown.vue'
import BentoDark from '~/components/Bento/Dark.vue'
import BentoNotion from '~/components/Bento/Notion.vue'

// import BentoRain from '~/components/Bento/Rain.vue'
import BentoPreview from '~/components/Bento/Preview.vue'

export const bentoCellsInDesktop = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(BentoProfile) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(BentoWeekly) },
  { id: '3', x: 0, y: 1, width: 2, height: 1, component: markRaw(BentoMapbox) },
  { id: '4', x: 3, y: 1, width: 1, height: 1, component: markRaw(BentoDark) },
  { id: '5', x: 3, y: 2, width: 2, height: 1, component: markRaw(BentoCountDown) },
  { id: '6', x: 0, y: 3, width: 1, height: 1, component: markRaw(BentoNotion) },
  // { id: '7', x: 0, y: 4, width: 1, height: 1, component: markRaw(BentoRain) },
  { id: '8', x: 1, y: 4, width: 1, height: 1, component: markRaw(BentoPreview) },
]

export const bentoCellsInMobile = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(BentoProfile) },
  { id: '2', x: 0, y: 2, width: 2, height: 1, component: markRaw(BentoWeekly) },
  { id: '3', x: 0, y: 3, width: 2, height: 1, component: markRaw(BentoMapbox) },
  { id: '4', x: 0, y: 4, width: 2, height: 1, component: markRaw(BentoCountDown) },
  { id: '5', x: 0, y: 5, width: 1, height: 1, component: markRaw(BentoDark) },
  { id: '6', x: 1, y: 5, width: 1, height: 1, component: markRaw(BentoNotion) },
  // { id: '7', x: 1, y: 4, width: 1, height: 1, component: markRaw(BentoRain) },
  { id: '8', x: 2, y: 4, width: 1, height: 1, component: markRaw(BentoPreview) },

]
