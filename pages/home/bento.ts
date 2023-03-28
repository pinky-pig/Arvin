import { markRaw } from 'vue'
import CountDown from '~/components/countdown/CountDown.vue'
import Profile from '~/components/profile/Profile.vue'
import Mapbox from '~/components/mapbox/Mapbox.vue'
export const bentoCells = [
  { id: '1', x: 0, y: 0, width: 2, height: 2, component: markRaw(Profile) },
  { id: '2', x: 2, y: 0, width: 2, height: 1, component: markRaw(Mapbox) },
  { id: '3', x: 3, y: 2, width: 1, height: 1, component: markRaw(CountDown) },
]
